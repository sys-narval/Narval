module.exports = {


    friendlyName: 'Actividad Usuario',
  
  
    description: '',
  
  
    inputs: {
      id: {
        type: 'number',
        required: true,
        unique: true,
        description: 'Id único generado automáticamente por la base de datos',
      },
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
        } else if(usuario.activo === true){
          await User.update({ id: inputs.id }, {activo: false}); // deshabilita el usuario en la base de datos
          return exits.success();
        } else {
          await User.update({ id: inputs.id }, {activo: true}); // habilita el usuario en la base de datos
          return exits.success();
        }
  
      } catch (error) {
  
        return exits.error(error.message);
  
      }
    }
  
  };