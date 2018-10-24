module.exports = {


  friendlyName: 'View inventario',


  description: 'Display "Inventario" page.',

  
  exits: {

    success: {
      viewTemplatePath: 'pages/inventario'
    }

  },


  fn: async function (inputs, exits) {
    let modelo= { //Retorna los datos necesarios
      a_categorias:['Truss','Cables','Mobiliario','Herramientas/otros','Cortinaje','Tarimas'], //Arreglo con las categorias de los articulos
      a_unidadMedida: ['metros', 'unidades'], //Arreglo con las uniades de medida
      l_errorId : "El ID es requerido",
      l_errorDescripcion : "La descripción es requerida", //Variables con las validaciones de los errores principales de un form
    };

    modelo.articulos = await Articulos.find();
    return exits.success({
      modelo
    });


  }


};
