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

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
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

    jsonArticulos: {
      type: "json"
    }

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
      } else {
        inputs.articulos = inputs.jsonArticulos.articulos.map(articulo => articulo.id);
      }




      await Cotizaciones.create(inputs);
      return exits.success();

    } catch (error) {

      return exits.error(error.message);

    }

  }

};
