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

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
