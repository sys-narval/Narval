module.exports = {


    friendlyName: 'Extraer contactos',
  
  
    description: '',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
  
      try {
        let contactos = await Contactos.find().populate("cliente");
  
        return exits.success(contactos);
        
      } catch (error) {
  
        return exits.notFound();
  
      }
  
    }
  
  
  };
  