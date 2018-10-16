module.exports = {


  friendlyName: 'Extraer inventario',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {


    let articulos = await Articulos.find();

    return exits.success(articulos);

  }


};
