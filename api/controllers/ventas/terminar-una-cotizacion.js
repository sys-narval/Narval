module.exports = {


  friendlyName: 'Terminar una cotización',


  description: '',


  inputs: {

    id: {
      type: "number",
      description: "ID de la cotización a reservar los artículos"
    },

    mensaje: {
      type: "string",
      description: "Mensaje de finalización para la cotización"
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
