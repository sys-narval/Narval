module.exports = {


  friendlyName: 'View inventario',


  description: 'Display "Inventario" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/inventario'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
