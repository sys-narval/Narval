module.exports = {


    friendlyName: 'Insertar contacto',
  
  
    description: '',
  
  
    inputs: {
      nombre: {
        type: "string",
        maxLength: 20,
        required: true,
        description: "Nombre del contacto de la empresa del cliente"
      },
  
      cedula: {
        type: "string",
        unique:true,
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
  
        switch (error.code) {
          case "E_UNIQUE":
            return exits.cedulaRepetido(`El contacto ${inputs.cedula} ya existe`);
          default:
            throw exits.error();
        }
  
      }
    }
  };