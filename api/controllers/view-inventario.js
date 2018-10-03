module.exports = {


  friendlyName: 'View inventario',


  description: 'Display "Inventario" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/inventario'
    }

  },


  fn: async function (inputs, exits) {
    let modeloI= {
      articulos: [{
        id:1,
        nombre: 'Pantalla',
        tamano: '42"',
        cantidad: 5,
        descripcion: 'Led',
        precio: 100000,
        estado: 'Disponible'
      },
    {
      id:2,
      nombre: 'Tros',
      tamano: '5 mts',
      cantidad: 3,
      descripcion: 'Tros metalico',
      precio: 10000,
      estado: 'Ocupado'
    },
  {
    id:3,
      nombre: 'Luces',
      tamano: '10 mts',
      cantidad: 4,
      descripcion: 'Luces especiales',
      precio: 20000,
      estado: 'Disponible'
  }]
    };
    // Respond with view.
    return exits.success({
      modeloI
    });
  }


};
