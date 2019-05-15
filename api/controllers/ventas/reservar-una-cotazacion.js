module.exports = {


  friendlyName: 'Reservar una cotazacion',


  description: '',


  inputs: {

    id: {
      type: "number",
      description: "ID de la cotización a reservar los artículos"
    }

  },


  exits: {

    cotizacionNoEncontrada: {
      message: "No se encuentra el cliente solicitado",
      responseType: "notFound"
    }

  },


  fn: async function (inputs, exits) {

    try {

      let cotizacion = await Cotizaciones.findOne({
          id: inputs.id
        })
        .populate("encargado")
        .populate("cliente")
        .populate("contacto");

      if (cotizacion === undefined) {
        return exits.cotizacionNoEncontrada(`Cotización ${inputs.id} no encontrada`);
      }

      if (cotizacion.estado !== "Pendiente") {
        return exits.error(`No se puede reservar una cotizacion en estado ${cotizacion.estado}`);
      }

      if (cotizacion.esMontaje || cotizacion.esAlquiler) {
        let dbArticulos = await Articulos.find({
          where: {
            id: {
              in: cotizacion.articulos.map(articulo => articulo.id)
            }
          },
          select: ["id", "cantidadLibre", "cantidadUso"]
        });

        cotizacion.articulos = cotizacion.articulos.map((articulo, index) => Object.assign(articulo, dbArticulos[index]));


        //Verificamos si están disponibles las cantidades requeridas
        if (cotizacion.articulos.some(function (articulo) {
            return articulo.cantidad > _.find(dbArticulos, {
              id: articulo.id
            }).cantidadLibre;
          })) {
          return exits.error(`No se cuenta con la cantidad suficiente de articulos`);
        }

        for (const articulo of cotizacion.articulos) {
          await Articulos.update({
            id: articulo.id
          }, {
            cantidadLibre: (articulo.cantidadLibre - articulo.cantidad),
            cantidadUso: (articulo.cantidadUso + articulo.cantidad)
          });
        }

      }

      await Cotizaciones.update({
        id: inputs.id
      }, {
        estado: "Activo"
      });

      return exits.success();

    } catch (error) {

      return exits.error(error.message);

    }

  }


};
