module.exports = {


  friendlyName: 'Extraer cotizaciones',


  description: '',


  inputs: {

  },


  exits: {
    noHayCotizaciones: {
      message: "No hay cotizaciones",
      responseType: "notFound"
    }
  },


  fn: async function (inputs, exits) {

    try {

      let cotizaciones = await Cotizaciones.find()
        .populate("encargado")
        .populate("cliente")
        .populate("contacto");

      if (cotizaciones === undefined) {
        return exits.noHayCotizaciones(`No existen cotizaciones.`);
      }

      for (const index in cotizaciones) {
        let cotizacion = cotizaciones[index];

        if (cotizacion.esMontaje || cotizacion.esAlquiler) {
          let dbArticulos = await Articulos.find({
            where: {
              id: {
                in: cotizacion.articulos.map(articulo => articulo.id)
              }
            },
            select: ["id", "descripcion", "categoria", "unidadMedida"]
          });
          cotizacion.articulos = cotizacion.articulos.map((articulo, index) => Object.assign(articulo, dbArticulos[index]));
        }
      }

      return exits.success(cotizaciones);

    } catch (error) {

      return exits.error(error.message);

    }
  }
};
