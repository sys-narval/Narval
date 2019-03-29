module.exports = {


  friendlyName: 'Insertar cotizacion',


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
      type: "json",
      required: true
    },

    cliente: {
      type: "json",
      required: true
    },

    contacto: {
      type: "json",
      required: true
    },

    articulos: {
      type: "json"
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      let cotizacion = await Cotizaciones.create(inputs);
      return exits.success(cotizacion);
    } catch (error) {
      return exits.error(error);
    }
  }

};
