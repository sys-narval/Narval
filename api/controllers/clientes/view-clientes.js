module.exports = {


  friendlyName: 'View clientes',


  description: 'Display "Clientes" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/clientes/clientes'
    }

  },


  fn: async function (inputs, exits) {
    let modelo = {
      l_errorNombre: 'El Nombre es requerido',
      l_errorCorreo: 'El Correo es requerido',
      l_errorCedula: 'La Cédula es requerida',
      l_errorTelefono: 'El Teléfono es requerido',
      l_errorIdRepetido: 'La cédula ya existe',
    }
    // Respond with view.

    modelo.clientes=await Clientes.find();
    modelo.contactos = await Contactos.find();
    return exits.success({modelo});

  }


};
