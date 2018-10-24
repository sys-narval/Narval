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
      a_categorias:['Truss','Cables','Mobiliario','Herramientas/otros','Cortinaje','Tarimas'],
      a_unidadMedida: ['metros', 'unidades'],
      l_errorId : "El ID es requerido",
      l_errorDescripcion : "La descripción es requerida",
    };

    modelo.articulos = await Articulos.find();
    return exits.success({
      modelo
    });


  }


};
