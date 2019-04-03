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
      contactos: [{
          empresa: 'Coca-Cola',
          telefonoEmpresarial: 2555555,
          correoEmpresarial: 'coca@gmail.com',
          Contacto: [{
              nombre: 'Jose quesada',
              telefono: 88989899,
              correo: 'jose@gmail.com'
            },
            {
              nombre: 'Mario Porras',
              telefono: 9998555,
              correo: 'mario@gmail.com'
            }
          ]
        },
        {
          empresa: 'Imprerial',
          telefonoEmpresarial: 2555555,
          correoEmpresarial: 'imperial@gmail.com',
          Contacto: [{
              nombre: 'Carlos quesada',
              telefono: 88989899,
              correo: 'carlos@gmail.com'
            },
            {
              nombre: 'Juan Porras',
              telefono: 9998555,
              correo: 'juan@gmail.com'
            }
          ]
        }
      ]
    }
    // Respond with view.
<<<<<<< HEAD
    return exits.success();
    modelo
=======
    modelo.clientes=Cloud.extraerClientes();
    return exits.success({modelo});
>>>>>>> parent of 53c44a9... Revert "Merge branch 'dev' of https://github.com/sys-narval/Narval into dev"
  }


};
