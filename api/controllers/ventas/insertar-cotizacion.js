module.exports = {


  friendlyName: 'Insertar cotización',


  description: '',


  inputs: {
    lugarEvento: {
      type: "string",
      maxLength: 200,
      description: "Lugar donde se desarrollará el evento"
    },

    esDiseno: {
      type: "boolean",
      default: false,
      description: "Se requiere o no el diseño"
    },

    esMontaje: {
      type: "boolean",
      default: false,
      description: "Se requiere o no el montaje"
    },

    esAlquiler: {
      type: "boolean",
      default: false,
      description: "Se requiere o no el alquiler"
    },

    descripcion: {
      type: "string",
      maxLength: 200,
      description: "Descripción de los servicios "
    },

    fechaEvento: {
      type: "number",
      description: "Fecha en la que inicia el evento"
    },

    fechaFinEvento: {
      type: "number",
      description: "Fecha del final del evento"
    },

    fechaMontaje: {
      type: "number",
      description: "Fecha del montaje del evento"
    },

    fechaDesmontaje: {
      type: "number",
      description: "Fecha del desmontaje del evento"
    },

    estado: {
      type: "string",
      isIn: ["Activo", "Cancelado", "Pendiente", "Finalizado"],
      defaultsTo: "Pendiente",
      description: "Estado actual de la cotización, unicamente permitidos los mencionados anteriormente"
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    jsonArticulos: {
      type: 'json',
      description: `JSON con los artículos requeridos para la cotización (en caso de ser tipo alquiler o montaje).
                        Se espera un JSON con la estructura { articulos: [ { id, cantidad, precio? } ] } Donde el precio es opcional
                        en caso de no incluirse, se asigna el precio que tiene el articulo en la BD`
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    encargado: {
      type: "number",
      required: true,
      description: "ID del encargado del evento"
    },

    cliente: {
      type: "number",
      required: true,
      description: "ID del cliente del evento"
    },

    contacto: {
      type: "number",
      required: true,
      description: "ID del contacto del evento"
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {

      /**
       * Verificación de las fechas en la cotización
       */

      // Verificación fecha del evento debe ser menor a la
      // fecha del final del evento
      if (inputs.fechaEvento && inputs.fechaFinEvento && inputs.fechaEvento > inputs.fechaFinEvento) {
        return exits.error("No se puede crear cotización cuya fecha de inicio sea mayor a la fecha final");
      }

      // Verificación fecha del montaje debe ser menor a la 
      // fecha del desmontaje
      if (inputs.fechaMontaje && inputs.fechaDesmontaje && inputs.fechaMontaje > inputs.fechaDesmontaje) {
        return exits.error("No se puede crear cotización cuya fecha de montaje sea mayor a la fecha desmontaje");
      }

      /**
       * Verificación del inventario en caso de ser alquiler o montaje
       */
      if ((inputs.esMontaje || inputs.esAlquiler) && inputs.jsonArticulos === undefined) {
        return exits.error("En caso de Alquiler o Montaje, por favor ingrese artículos");
      }
      /**
       * En caso de montaje o alquiler y trae inventario
       * normalizamos el inventario recibido
       */
      else if (inputs.esMontaje || inputs.esAlquiler) {

        /**
         * Validamos si todos los id de artículos existen en la BD
         */
        let idArticuloError;
        let dbArticulos = await Articulos.find();

        if (inputs.jsonArticulos.articulos.some((articulo) => {
            let result = _.find(dbArticulos, (dbArticulo) => {
              idArticuloError = articulo.id;
              return dbArticulo.id === articulo.id;
            });
            return (result === undefined);
          })) {
          return exits.error(`El articulo con el Id ${idArticuloError} no existe en el inventario`);
        }

        /**
         * Validamos los precios 
         * en caso de no tener se le asigna el original del la BD
         */

        inputs.jsonArticulos.articulos.forEach((articulo, index) => {
          if (articulo.precio === undefined) {
            inputs.jsonArticulos.articulos[index].precio = _.find(dbArticulos, (dbArticulo) => {
              idArticuloError = articulo.id;
              return dbArticulo.id === articulo.id;
            }).precio;
          }
        });
      }

      /**
       * Validamos el caso en que solo es diseño
       * no puede tener articulos
       */
      if (inputs.esDiseno && !(inputs.esMontaje || inputs.esAlquiler) && inputs.jsonArticulos !== undefined) {
        return exits.error('En caso que es solo servicio de diseño por favor no ingresar articulos.');
      }




      await Cotizaciones.create(inputs);
      return exits.success();

    } catch (error) {

      return exits.error(error.message);

    }

  }

};
