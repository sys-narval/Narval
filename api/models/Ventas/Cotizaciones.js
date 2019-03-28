/**
 * Ventas/Cotizaciones.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {


    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    lugarEvento: {
      type: "string",
      maxLength: 200,
      description: "Lugar donde se desarrollará el evento"
    },

    esDiseno: {
      type: "boolean",
      description: "Se requiere o no el diseño"
    },

    esMontaje: {
      type: "boolean",
      description: "Se requiere o no el montaje"
    },

    esAlquiler: {
      type: "boolean",
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
      model: "User"
    },

    cliente: {
      model: "Clientes"
    },

    contacto: {
      model: "Contactos"
    },

    articulos:{
      collection: "Articulos"
    }

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

