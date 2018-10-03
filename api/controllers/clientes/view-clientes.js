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
    return exits.success();
    modelo
  }


};
