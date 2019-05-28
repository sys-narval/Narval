module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/homepage'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

  },


  fn: async function (inputs, exits) {

    if (this.req.me) {
      throw {
        redirect: '/welcome'
      };
    }

    let modelo = {
      jumbotron_titulo: 'Bienvenido al Sistema Narval!',
      jumbotron_texto: 'Sistema realizado en exclusiva para la empresa IMAGO PRODUCCIONES S.A',
      avisos: [{
          titulo: '<i class="fa fa-info-circle"></i> Alguna información del sistema:',
          mensaje: 'En el presente sistema se podrá llevar un control del inventario, realizar cotizaciones, manejo de clientes y la observación de las cotizaciones.'
        },
        {
          titulo: '<i class="fa fa-stack-exchange"></i> Últimos cambios:',
          mensaje: 'En esta versión se controla cuantos activos tiene la empresa en bodega, para el mejor manejo de los mismos, además de brindar la información necesaria para las personas encargadas de realizar cotizaciones.\n Se podrán realizar cotizaciones para después poderlas activar si se llegan a aprobar.\n Cabe destacar que se puede copiar una cotización si la misma es muy parecida a una anteriormente realizada.\n Se puede manejar los cliente de la empresa con sus respectivos contactos.'
        },
        {
          titulo: '<i class="fa fa-exclamation-circle"></i> Más datos importantes:',
          mensaje: 'Se elige el nombre NARVAL por la especie marina, al ser una especie que trabaja en conjunto para lograr salir adelante se asemeja mucho a la forma de trabajar de esta empresa, que en conjunto a sus empleados trabajan juntos como un todo para lograr sus objetivos empresariales'
        }
      ]
    }

    return exits.success({
      modelo
    });

  }


};
