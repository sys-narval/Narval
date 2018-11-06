module.exports = {


  friendlyName: 'Insertar un artículo',


  description: 'Inserta un artículo a la base de datos',


  inputs: {
    id: {
      type: 'string',
      required: true,
      maxLength: 4,
      unique: true,
      description: 'ID único de 4 caracteres para identificar el artículo dentro de la base de datos',
      example: 'T001'
    },

    descripcion: {
      type: 'string',
      required: true,
      description: 'Descripción del artículo para mostrar a los usuarios',
      example: 'Truss de 2m color plateado'
    },

    categoria: {
      type: 'string',
      required: true,
      description: 'Categoría a la que pertenece el articulo (electrónico, truss, cable, mobiliario, herramientas, tarimas, cortinaje)',
      example: 'Tarima'
    },

    precio: {
      type: 'number',
      required: true,
      description: 'Precio estándar del articulo para hacer cálculos de precios iniciales',
      example: 1200
    },

    cantidadLibre: {
      type: 'number',
      description: 'Cantidad de dicho articulo libre para ser alquilado o utilizado',
      example: 2
    },

    cantidadUso: {
      type: 'number',
      description: 'Cantidad de dicho articulo que actualmente se encuentra en uso.',
      example: 2
    },

    cantidadReservado: {
      type: 'number',
      description: 'Cantidad de dicho articulo que actualmente se encuentra alquilado o fuera de bodega',
      example: 2
    },

    cantidadDanado: {
      type: 'number',
      description: 'Cantidad de dicho articulo que esta dañado y no se puede utilizar',
      example: 2
    },

    cantidadTotal: {
      type: 'number',
      required: true,
      description: 'Cantidad total de dicho articulo sumando cantidad libre + cantidad uso + cantidad reservado + cantidad dañado',
      example: 8
    },

    unidadMedida: {
      type: 'string',
      required: true,
      maxLength: 10,
      description: 'Especificación de la medida que se usa para definir cantidades del articulo (m2, unidades, litro, m, cm...)',
      example: 'unidades'
    },

    activo: {
      type: 'boolean',
      defaultsTo: true,
      description: 'Atributo para definir si un articulo esta activo o desactivo para su uso en el inventario',
      example: true
    },

    // Elementos específicos requeridos para artículos electrónicos
    amperaje: {
      type: 'number',
      description: 'Amperaje usado por el articulo electrónico para cuantificar amperaje total para el evento',
      example: 1
    },

    tipo: {
      type: 'string',
      description: 'Tipo de articulo electrónico, ya sea TV, Audio o Luces',
      example: 'Television'
    },

    serialesBuenos: {
      type: 'string',
      description: 'Seriales de los dispositivos en buen estado, se guarda en un solo string separado por comas',
      example: 'TV01, TV04'
    },

    serialesUso: {
      type: 'string',
      description: 'Seriales de los dispositivos en uso, se guarda en un solo string separado por comas',
      example: 'TV02'
    },

    serialesReservado: {
      type: 'string',
      description: 'Seriales de los dispositivos reservados, se guarda en un solo string separado por comas',
      example: 'Tv03'
    },

    serialesDanado: {
      type: 'string',
      description: 'Seriales de los dispositivos dañados, se guarda en un solo string separado por comas',
      example: 'TV05'
    },

    serialesTotal: {
      type: 'string',
      description: 'Seriales totales de los dispositivos, se guarda en un solo string separado por comas',
      example: 'TV01, TV02, Tv03, TV04, TV05, ...'
    },

    // Elementos específicos requeridos para artículos Truss y Cables
    largo: {
      type: 'number',
      description: 'Largo del articulo especificado en metros',
      example: 1
    },
  },


  exits: {
    idRepetido: {
      description: 'Error cuando el Id esta repetido'
    },
  },


  fn: async function (inputs, exits) {
    //Controlador de los datos numericos
    inputs.cantidadTotal = parseInt(inputs.cantidadTotal);
    inputs.cantidadLibre = parseInt(inputs.cantidadTotal);
    inputs.precio = parseInt(inputs.precio);
    inputs.cantidadDanado = 0;
    inputs.cantidadUso = 0;
    inputs.cantidadReservado = 0;

    // En caso de categoría electronica
    if(inputs.categoria === 'Electrónico'){
      inputs.serialesBuenos = inputs.serialesTotal;
    }

    let response = await Articulos.create(inputs).intercept('E_UNIQUE', 'idRepetido');
    console.log(response);
    return exits.success();

  }


};
