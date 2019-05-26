module.exports = {


    friendlyName: 'Actualizar rol de Usuarios',
  
  
    description: '',
  
  
    inputs: {
      id: {
        type: 'number',
        required: true,
        unique: true,
        description: 'Id único generado automáticamente por la base de datos',
      },

      rol: {
        type: 'string',
        defaultsTo: 'Ninguno',
        description: 'El rol que el usuario tendrá dentro de la aplicación según su puesto de trabajo',
        example: 'Bodeguero'
      }
    },
  
  
    exits: {
      idNoEncontrado: {
        message: "No se encuentra el usuario solicitado",
        responseType: "notFound"
      }
  
    },
  
  
    fn: async function (inputs, exits) {
      try {
        let usuario = await User.findOne({ id: inputs.id });
        if (usuario === undefined) {
          return exits.idNoEncontrado(`Usuario ${inputs.id} no encontrado`);
        } else {
          await User.update({ id: inputs.id }, inputs);
          return exits.success();
        }
  
      } catch (error) {
  
        return exits.error(error.message);
  
      }
    }
  
  };