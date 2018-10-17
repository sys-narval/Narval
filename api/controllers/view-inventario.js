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
      tipos:['TRUSS','Cables','Mobiliario','Herramientas/otros','Cortinaje','Tarimas'],
      unidadMedida: ['metros', 'unidades'],
  articuloNuevo: {}
    };

    //modeloI.articulos = await Cloud.extraerInventario();
    modeloI.articulos = await Articulos.find();
    return exits.success({
      modeloI
    });


  }


};
