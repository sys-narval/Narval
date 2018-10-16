module.exports = {


  friendlyName: 'Extraer inventario',


  description: '',


  inputs: {

  },


  exits: {
  },


  fn: async function (inputs, exits) {

    let articulos = await Articulos.find().log();

    return exits.success({
      articulos
    });

  }


};
