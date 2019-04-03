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
<<<<<<< HEAD
<<<<<<< HEAD
    return exits.success();
    modelo
=======
    modelo.clientes=Cloud.extraerClientes();
    return exits.success({modelo});
>>>>>>> parent of 53c44a9... Revert "Merge branch 'dev' of https://github.com/sys-narval/Narval into dev"
=======
    modelo.clientes=await Clientes.find();
    return exits.success({modelo});
>>>>>>> parent of 0621802... Revert "Merge branch 'dev' of https://github.com/sys-narval/Narval into dev"
  }


};
