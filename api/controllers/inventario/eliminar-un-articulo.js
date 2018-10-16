module.exports = {


  friendlyName: 'Eliminar un articulo',


  description: '',


  inputs: {
    id: {
       type: 'string',
       required: true,
       maxLength: 4,
       unique: true,
       description: 'ID único de 4 caracteres para identificar el articulo dentro de la base de datos',
       example: 'T001'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    await Articulos.destroy(inputs);

    return exits.success(inputs.id);
    
  }


};
