module.exports = {


  friendlyName: 'View clientes',


  description: 'Display "Clientes" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/clientes/clientes'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
