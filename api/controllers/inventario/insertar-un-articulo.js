module.exports = {


  friendlyName: 'Insertar un articulo',


  description: '',


  inputs: {
    id: {
      required: true,
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    return exits.success(
      inputs.id
    );

  }


};
