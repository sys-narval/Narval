module.exports = {


  friendlyName: 'Extraer cotizacion',


  description: '',


  inputs: {
    encargado: {
      type: "string",
      description: "Nombre de la persona encargada"
    },

    id: {
      type: "number",
      description: "ID de la cotización a extraer (en caso de conocerlo)"
    }

  },


  exits: {
    cotizacionNoEncontrada: {
      message: "No se encuentra la cotización solicitado",
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
        .populate("contacto")
        .populate("articulos");

      if (cotizacion === undefined) {
        return exits.cotizacionNoEncontrada(`Cotización ${inputs.id} no encontrada`);
      } else {
        return exits.success(cotizacion);
      }

    } catch (error) {
      return exits.error(error.message);
    }

  }

};
