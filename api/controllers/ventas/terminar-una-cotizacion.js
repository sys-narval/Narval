module.exports = {


  friendlyName: 'Terminar una cotización',


  description: '',


  inputs: {

    id: {
      type: "number",
      required: true,
      description: "ID de la cotización a reservar los artículos"
    },

    comentario: {
      type: "string",
      description: "Mensaje de finalización para la cotización"
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

      // Comprobamos si la cotización existe en la BD
      if (cotizacion === undefined) {
        return exits.cotizacionNoEncontrada(`No se encuentra la cotización con el ID: ${inputs.id}`);
      }

      switch (cotizacion.estado) {
        case "Activo":
          // Verificamos si la cotizacion es alquiler o montaje
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

            for (const articulo of cotizacion.articulos) {
              await Articulos.update({
                id: articulo.id
              }, {
                cantidadLibre: (articulo.cantidadLibre + articulo.cantidad),
                cantidadUso: (articulo.cantidadUso - articulo.cantidad)
              });
            }
          }

          // Si el evento estaba en estado 'Activo' y se termina
          // se considera como 'Finalizado'
          cotizacion.estado = "Finalizado";
          break;

        case "Pendiente":
          // Si el evento estaba en estado 'Pendiente' y se termina
          // se considera como 'Cancelado'
          cotizacion.estado = "Cancelado";
          break;
        default:
          
          return exits.error(`No se puede Finalizar un evento en estado: ${cotizacion.estado}`);
      }

      cotizacion.comentario = inputs.comentario;

      await Cotizaciones.update({
        id: inputs.id
      }, {
        estado: cotizacion.estado,
        comentario: cotizacion.comentario
      });

      return exits.success();

    } catch (error) {
      return exits.error(error.message);
    }

  }


};
