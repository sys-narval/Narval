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
      l_errorCedula: 'El Cedula es requerido',
      l_errorTelefono: 'El Telefono es requerido',
      l_errorIdRepetido: 'La cedula ya existe',
    }
    // Respond with view.

    modelo.clientes=await Clientes.find();
    return exits.success({modelo});

  }


};
