module.exports = {


    friendlyName: 'Extraer usuarios',
  
  
    description: '',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
  
      try {
        let usuario = await User.find();
  
        return exits.success(usuario);
        
      } catch (error) {
  
        return exits.notFound();
  
      }
  
    }
  
  
  };
  