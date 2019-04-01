module.exports = {


    friendlyName: 'Actualizar cliente',
  
  
    description: '',
  
  
    inputs: {
      //Valores que posee un cliente
        nombre: {
            type: 'string',
            required: true,
            maxLength: 20,
            unique: true,
            description: 'Nombre del Cliente',
          },
  
          cedula: {
            type: 'string',
            maxLength: 10,
            description: 'Cedula del cliente, se deja de 10 campos en caso de ced. jurídica',
          },
  
          correo: {
            type: 'string',
            required: true,
            maxLength: 200,
            isEmail: true,
            description: 'Correo electrónico del cliente',
          },
  
          telefono: {
            type: "string",
            maxLength: 10,
            description: "Número telefónico del cliente",
            required: true,
          },
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {

      await Clientes.update({nombre: inputs.nombre},inputs);

      return exits.success();
    }
  
  
  };