module.exports = {


  friendlyName: 'View inventario',


  description: 'Display "Inventario" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/inventario'
    }

  },


  fn: async function (inputs, exits) {
    let modelo = { //Retorna los datos necesarios
      a_categorias: ['Truss', 'Cables', 'Mobiliario', 'Herramientas/Otros', 'Cortinaje', 'Tarimas', 'Electrónico'], //Arreglo con las categorías de los artículos
      a_tipos: ['Luces', 'Audio', 'Video'], // Arreglo con los tipos de artículos electrónicos
      a_unidadMedida: ['Metros', 'Unidades'], //Arreglo con las unidades de medida
      l_errorId: 'El ID es requerido',
      l_errorDescripcion: 'La descripción es requerida', //Variables con las validaciones de los errores principales de un form
      l_errorCantidadTotal: 'La cantidad total es requerida',
      l_errorPrecio: 'El precio es requerido',
      l_errorCategorias: 'Por favor seleccione una categoría.',
      l_errorUnidadMedida: 'Por favor seleccione una unidad de medida.',
      l_errorIdRepetido: 'Artículo con el mismo ID ya existe',
    };

    modelo.articulos = await Cloud.extraerInventario();
    return exits.success({
      modelo
    });


  }


};
