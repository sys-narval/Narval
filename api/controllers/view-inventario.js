module.exports = {


  friendlyName: 'View inventario',


  description: 'Display "Inventario" page.',

  
  exits: {

    success: {
      viewTemplatePath: 'pages/inventario'
    }

  },


  fn: async function (inputs, exits) {
    /*let modeloI= {
      tipos:['TRUSS','Cables','Mobiliario','Herramientas'],
      unidadMedida: ['metros', 'unidades'],
      articulos: [{
        id:'T001',
        descripcion : '0.25mts',
        cantidadLibre: 10,
        cantidadUso: 0,
        cantidadDanado: 0,
        cantidadTotal: 10,
        tipo: 'TRUSS',
        precio: 1000
      },
    {
      id:'C001',
      descripcion : 'Conectores de 3 Vias',
      cantidadLibre: 1,
      cantidadUso: 0,
      cantidadDanado: 0,
      cantidadTotal: 1,
      tipo: "Cables",
      precio: 2000
    },
  {
    id:'M001',
    descripcion : 'Sillón Blanco 1pax',
      cantidadLibre: 2,
      cantidadUso: 0,
      cantidadDanado: 0,
      cantidadTotal: 1,
      tipo: 'Mobiliario',
      precio: 2000
  },
  {
    id:'H001',
    descripcion : 'Maquina de Humo',
    cantidadLibre: 1,
    cantidadUso: 0,
    cantidadDanado: 0,
    cantidadTotal: 1,
    tipo: 'Herramientas',
    precio: 2000
  }],
  articuloNuevo: {}
    };
    // Respond with view.
    return exits.success({
      modeloI
    });*/

    let modeloI = await Cloud.extraerInventario.with();
    return exits.success({
      modeloI
    });


  }


};
