module.exports = {


  friendlyName: 'View acerca',


  description: 'Display "Acerca" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/acerca'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
