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
      a_unidadMedida: ['Metros', 'Unidades'], //Arreglo con las uniades de medida
      l_errorId : 'El ID es requerido',
      l_errorDescripcion : 'La descripción es requerida', //Variables con las validaciones de los errores principales de un form
      l_errorCantidadTotal: 'La cantidad total es requerida',
      l_errorPrecio: 'El precio es requerido',
      l_errorCategorias: 'Por favor seleccione una categoría.',
      l_errorUnidadMedida: 'Por favor seleccione una unidad de medida.',
    };

    modelo.articulos = await Articulos.find();
    return exits.success({
      modelo
    });


  }


};
