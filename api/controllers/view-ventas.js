module.exports = {


  friendlyName: 'View ventas',


  description: 'Display "Ventas" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/ventas'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
