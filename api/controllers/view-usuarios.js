module.exports = {


  friendlyName: 'View usuarios',


  description: 'Display "Usuarios" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/usuarios'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
