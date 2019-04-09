module.exports = {


  friendlyName: 'Actualizar cliente',


  description: '',


  inputs: {
    //Valores que posee un cliente
    nombre: {
      type: 'string',
      maxLength: 20,
      description: 'Nombre del Cliente',
    },

    cedula: {
      type: 'string',
      unique: true,
      required: true,
      maxLength: 10,
      description: 'Cedula del cliente, se deja de 10 campos en caso de ced. jurídica',
    },

    correo: {
      type: 'string',
      maxLength: 200,
      isEmail: true,
      description: 'Correo electrónico del cliente',
    },

    telefono: {
      type: "string",
      maxLength: 10,
      description: "Número telefónico del cliente",
    },

    activo: {
      type: 'boolean',
      defaultsTo: true,
      description: 'Atributo para definir si el cliente esta activo o desactivo',
    },

  },


  exits: {
    clienteNoEncontrado: {
      message: "No se encuentra el cliente solicitado",
      responseType: "notFound"
    }

  },


  fn: async function (inputs, exits) {
    try {
      let cliente = await Clientes.findOne({ cedula: inputs.cedula }).populate("contactos");
      if (cliente === undefined) {
        return exits.clienteNoEncontrado(`Cliente ${inputs.cedula} no encontrado`);
      } else {
        await Clientes.update({ cedula: inputs.cedula }, inputs);
        return exits.success();
      }

    } catch (error) {

      return exits.error(error.message);

    }
  }

};