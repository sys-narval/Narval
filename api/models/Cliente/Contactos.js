/**
 * Cliente/Contactos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    nombre: {
      type: "string",
      maxLength: 20,
      description: "Nombre del contacto de la empresa cliente"
    },

    cedula:{
      type: "String",
      required: true,
      maxLength: 10,
      description: "Numero de cedula de del contacto de la empresa del cliente"
    },

    telefono: {
      type: "string",
      maxLength: 10,
      description: "Numero de teléfono del contacto, se deja espacio de 10 en caso de numero internacional"
    },

    correo: {
      type: "string",
      isEmail: true,
      maxLength: 200,
      description: "Correo electrónico del contacto de la empresa"
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    cliente: {
      model: "Clientes",
      description: "Referencia de cual es el cliente de este contacto"
    }
  },

};

