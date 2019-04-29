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
        .populate("contacto")
        .populate("articulos");

      if (cotizaciones === undefined) {
        return exits.success(cotizaciones)
      } else {
        return exits.noHayCotizaciones(`No existen cotizaciones.`);
      }

    } catch (error) {

      return exits.error(error.message);

    }

  }

};
