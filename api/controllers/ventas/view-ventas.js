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
      v_NArticulos:[{}],
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
        },
        {
          name: 'Company',
          telefono: '333',
          correo: '3333@gmail.com'
        }
      ],
      a_categorias: ['Truss', 'Cables', 'Mobiliario', 'Herramientas/Otros', 'Cortinaje', 'Tarimas', 'Electrónico'], //Arreglo con las categorías de los artículos
      a_tipos: ['Luces', 'Audio', 'Video'], // Arreglo con los tipos de artículos electrónicos
      a_unidadMedida: ['Metros', 'Unidades','Centímetros','Pulgadas'], //Arreglo con las unidades de medida
      l_errorNombre : "El nombre es necesario",
      l_errorTelefono: "El número de teléfono debe contener al menos 9 dígitos",
      l_errorCorreo: "El correo electrónico es necesario"

    };

   /* modelo.articulos = await Articulos.find();
    modelo.clientes = await Clientes.find();
    modelo.contactos = await Contactos.find();*/
    // Respond with view.
    return exits.success({
      modelo
    });

  }


};
