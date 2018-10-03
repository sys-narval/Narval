module.exports = {


  friendlyName: 'View ventas',


  description: 'Display "Ventas" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/ventas/ventas'
    }

  },


  fn: async function (inputs, exits) {

    let modelo = {
      msg: 1,
      usuario: 'Jose quesada',
      txtCliente: '',
      txtEmpresa: '',
      txtArticulo: '',
      verClientes: false,
      verArticulos: false,
      verEmpresa: false,
      articulos: [{
        id: 1,
          cantidad: 2,
          name: 'Tros',
          descripcion: 'Distancia dos metros',
          precio: 500,
        
        },
        {
          id: 2,
          cantidad: 3,
          name: 'Pantallas',
          descripcion: '40 pulgadas',
          precio: 300,
        }
      ],
      Clientes: [{
          name: 'Jose arturo',
          telefono: '89792734',
          correo: 'jose17971@outlook.es'
        },
        {
          name: 'Jose antonio',
          telefono: '89792734',
          correo: 'jose17971@outlook.es'
        },
        {
          name: 'Mario',
          telefono: '8888888',
          correo: 'mario123@gmailcom'
        },
      ],
      empresas: [{
          name: 'Coca Cola',
          telefono: '1111',
          correo: '1122@gmail.com'
        },
        {
          name: 'Nisan',
          telefono: '2222',
          correo: '222222@gmail.com'
        }
      ]
    };
    // Respond with view.
    return exits.success({
      modelo
    });

  }


};
