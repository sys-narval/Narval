module.exports = {


  friendlyName: 'View inventario',


  description: 'Display "Inventario" page.',

  
  exits: {

    success: {
      viewTemplatePath: 'pages/inventario'
    }

  },


  fn: async function (inputs, exits) {
    let modelo= {
      a_categorias:['TRUSS','Cables','Mobiliario','Herramientas/otros','Cortinaje','Tarimas'],
      a_unidadMedida: ['metros', 'unidades'],
    };

    modelo.articulos = await Articulos.find();
    return exits.success({
      modelo
    });


  }


};
