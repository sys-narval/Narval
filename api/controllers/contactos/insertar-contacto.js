module.exports = {


  friendlyName: 'Insertar contacto',


  description: '',


  inputs: {
    nombre: {
      type: "string",
      maxLength: 40,
      required: true,
      description: "Nombre del contacto de la empresa del cliente"
    },

    cedula: {
      type: "string",
      unique: true,
      required: true,
      maxLength: 10,
      description: "Cedula del contacto, se deja de 10 campos en caso de ced. jurídica"
    },

    telefono: {
      type: "string",
      maxLength: 10,
      description: "Número telefónico del contacto"
    },

    correo: {
      type: "string",
      maxLength: 200,
      isEmail: true,
      description: "Correo electrónico del contacto"
    },

    activo: {
      type: 'boolean',
      defaultsTo: true,
      description: 'Atributo para definir si el contacto esta activo o desactivo',
    },

    cliente: {
      type: "number",
      required: true,
      unique: true,
      description: "ID del cliente en la BD"
    }

  },

  exits: {
    cedulaRepetido: {
      description: "Excepción cuando la cedula del contacto ya esta en uso",
      responseType: "idRepetido"
    }
  },

  fn: async function (inputs, exits) {

    try {

      await Contactos.create(inputs);
      return exits.success();

    } catch (error) {

      if (error.code === "E_UNIQUE") {
        return exits.nombreRepetido(`El contacto ${inputs.cedula} ya existe`);
      } else {
        return exits.error();
      }
    }
  }
};
