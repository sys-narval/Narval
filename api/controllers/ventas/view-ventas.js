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
          cantidadTotal: 2,
          name: 'Tross',
          descripcion: 'Distancia dos metros',
          precio: 500,
          largo: '2 m'
        
        },
        {
          id: 2,
          cantidadTotal: 3,
          name: 'Pantallas',
          descripcion: '40 pulgadas',
          precio: 300,
          amperaje: '55'
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
          correo: 'mario123@gmail.com'
        },
      ],
      empresas: [{
          name: 'Coca Cola',
          telefono: '1111',
          correo: '1122@gmail.com'
        },
        {
          name: 'Nissan',
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
