module.exports = {


    friendlyName: 'Actualizar contacto',
  
  
    description: '',
  
  
    inputs: {
      //Valores que posee un contacto
      nombre: {
        type: 'string',
        maxLength: 20,
        unique: true,
        description: 'Nombre del Contacto',
      },
  
      cedula: {
        type: 'string',
        required: true,
        maxLength: 10,
        description: 'Cedula del contacto, se deja de 10 campos en caso de ced. jurídica',
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
  
    },
  
  
    exits: {
      contactoNoEncontrado: {
        message: "No se encuentra el contacto solicitado",
        responseType: "notFound"
      }
  
    },
  
  
    fn: async function (inputs, exits) {
      try {
        let contacto = await Contactos.findOne({ cedula: inputs.cedula });
        if (contacto === undefined) {
          return exits.clienteNoEncontrado(`Cliente ${inputs.cedula} no encontrado`);
        } else {
          await Contactos.update({ cedula: inputs.cedula }, inputs);
          return exits.success();
        }
  
      } catch (error) {
  
        return exits.error(error.message);
  
      }
    }
  
  };