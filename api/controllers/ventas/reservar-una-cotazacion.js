module.exports = {


  friendlyName: 'Reservar una cotazacion',


  description: '',


  inputs: {

    id: {
      type: "number",
      required: true,
      description: "ID de la cotización a reservar los artículos"
    }

  },


  exits: {

    cotizacionNoEncontrada: {
      message: "No se encuentra la cotización solicitada",
      responseType: "notFound"
    }

  },


  fn: async function (inputs, exits) {

    try {

      let cotizacion = await Cotizaciones.findOne({
        where: {
          id: inputs.id
        },
        select: ["estado", "esMontaje", "esAlquiler", "articulos"]
      });

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
            return articulo.cantidad > articulo.cantidadLibre;
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

      cotizacion.estado = "Activo";

      await Cotizaciones.update({
        id: inputs.id
      }, {
        estado: cotizacion.estado
      });

      return exits.success();

    } catch (error) {

      return exits.error(error.message);

    }

  }


};
