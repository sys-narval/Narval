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

    estado: {
      type: "string",
      isIn: ["Activo", "Cancelado", "Pendiente", "Finalizado"],
      defaultsTo: "Pendiente",
      description: "Estado actual de la cotización, unicamente permitidos los mencionados anteriormente"
    },

    comentario: {
      type: 'string',
      defaultsTo: '',
      maxLength: 200,
      description: 'Comentario de la cotización al momento de cambiar el estado a Cancelado o Finalizado',
      example: 'La cotización se cancelo ya que no se acepto la cotización planteada.'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    articulos: {
      type: 'json',
      description: `JSON con los artículos requeridos para la cotización (en caso de ser tipo alquiler o montaje).
                        Se espera un JSON con la estructura { articulos: [ { id, cantidad, precio? } ] } Donde el precio es opcional
                        en caso de no incluirse, se asigna el precio que tiene el articulo en la BD`
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    encargado: {
      model: "User"
    },

    cliente: {
      model: "Clientes"
    },

    contacto: {
      model: "Contactos"
    },
  },

};
