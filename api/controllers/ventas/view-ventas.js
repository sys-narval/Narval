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
      filteredCliente: function () {
        return this.Clientes.filter((Cliente) => {
          return Cliente.name.match(this.txtCliente)
        })
      },
      filteredEmpresa: function () {
        return this.empresas.filter((empresa) => {
          return empresa.name.match(this.txtEmpresa)
        })
      },
      filteredArticulos: function () {
        return this.articulos.filter((articulo) => {
          return articulo.name.match(this.txtArticulo)
        })
      },
      usuario: 'Jose quesada',
      txtCliente: '',
      txtEmpresa: '',
      txtArticulo: '',
      verClientes: false,
      verArticulos: false,
      verEmpresa: false,
      articulos: [],
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
