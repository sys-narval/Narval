module.exports = {


  friendlyName: 'View usuarios',


  description: 'Display "Usuarios" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/usuarios'
    }

  },


  fn: async function (inputs, exits) {

    let modelo = {
      usuarios: [{
          nombre: 'Luis',
          correo: 'luis123Imago@gmail.com',
          rol: 'Administrador',
          fecha: '2018-10-01',
        },
        {
          nombre: 'Frank',
          correo: 'frank123IMAGO@gmail.com',
          rol: 'TI',
          fecha: '2018-09-30',
        }
      ]
    };

    // Respond with view.
    return exits.success({
      modelo
    });

  }


};
