module.exports = {


  friendlyName: 'Eliminar un artículo',


  description: '',


  inputs: {
    id: {
       type: 'string',
       required: true,
       maxLength: 4,
       unique: true,
       description: 'ID único de 4 caracteres para identificar el artículo dentro de la base de datos',
       example: 'T001'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    await Articulos.update({id: inputs.id}, {activo: false}); //Elimina el articulo de la base de datos local

    return exits.success(inputs.id);
    
  }


};
