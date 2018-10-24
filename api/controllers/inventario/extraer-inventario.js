module.exports = {


  friendlyName: 'Extraer inventario',


  description: '',


  inputs: {

  },


  exits: {
  },


  fn: async function (inputs, exits) {

    let articulos = await Articulos.find().log(); //Retorna todo de la base de datos local

    return exits.success({
      articulos
    });

  }


};
