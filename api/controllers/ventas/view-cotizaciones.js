module.exports = {


  friendlyName: 'View cotizaciones',


  description: 'Display "Cotizaciones" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/ventas/cotizaciones'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
