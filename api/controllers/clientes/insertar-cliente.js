module.exports = {


  friendlyName: 'Insertar cliente',


  description: '',


  inputs: {
    nombre: {
      type: "string",
      maxLength: 20,
      required: true,
      unique: true,
      description: "Nombre del cliente"
    },

    cedula: {
      type: "string",
      maxLength: 10,
      description: "Cedula del cliente, se deja de 10 campos en caso de ced. jurídica"
    },

    correo: {
      type: "string",
      maxLength: 200,
      isEmail: true,
      description: "Correo electrónico del cliente"
    },

    telefono: {
      type: "string",
      maxLength: 10,
      description: "Número telefónico del cliente"
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    await ClientRectList.create(inputs);

    return exits.success();

  }


};
