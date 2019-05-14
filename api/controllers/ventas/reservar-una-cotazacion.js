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


  fn: async function (inputs) {

    // All done.
    return;

  }


};
