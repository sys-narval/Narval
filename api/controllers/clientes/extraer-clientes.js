module.exports = {


  friendlyName: 'Extraer clientes',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    try {
      let clientes = await Clientes.find().populate("contactos");

      return exits.success(clientes);
      
    } catch (error) {

      return exits.notFound();

    }

  }


};
