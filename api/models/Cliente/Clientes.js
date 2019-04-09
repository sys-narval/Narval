/**
 * Cliente/Clientes.js
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
      required: true,
      description: "Nombre del cliente"
    },

    cedula: {
      type: "string",
      required:true,
      unique: true,
      maxLength: 10,
      description: "Cedula del cliente, se deja de 10 campos en caso de ced. jurídica"
    },

    correo: {
      type: "string",
      maxLength: 200,
      isEmail: true,
      description: "Correo electrónico del cliente"
    },

    telefono: {
      type: "string",
      maxLength: 10,
      description: "Número telefónico del cliente"
    },

    activo: {
      type: 'boolean',
      defaultsTo: true,
      description: 'Atributo para definir si el cliente esta activo o desactivo',
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    contactos:{
      collection: "contactos",
      via: "cliente"
    }

  },

};

