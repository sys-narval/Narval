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

    activo: {
      type: 'boolean',
      defaultsTo: true,
      description: 'Atributo para definir si el cliente esta activo o desactivo',
    },

  },

  exits: {
    nombreRepetido: {
      description: "Excepción cuando el nombre del cliente ya esta en uso",
      responseType: "idRepetido"
    }
  },


  fn: async function (inputs, exits) {

    try {

      await Clientes.create(inputs);
      return exits.success();

    } catch (error) {

      switch (error.code) {
        case "E_UNIQUE":
          return exits.nombreRepetido(`El cliente ${inputs.nombre} ya existe`);
        default:
          throw exits.error();
      }

    }
  }
};
