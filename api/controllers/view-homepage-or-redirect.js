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
      jumbotron_texto: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat corporis maxime at adipisci sint ipsum incidunt quasi labore possimus quae amet quidem voluptatum id, recusandae nobis quis. Minima, laboriosam expedita?',
      avisos: [{
          titulo: '<i class="fa fa-info-circle"></i> Algua informacion del sistema:',
          mensaje: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat corporis maxime at adipisci sint ipsum incidunt quasi labore possimus quae amet quidem oluptatum id, recusandae nobis quis. Minima, laboriosam expedita?'
        },
        {
          titulo: '<i class="fa fa-stack-exchange"></i> Ultimos cambios:',
          mensaje: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, aspernatur animi voluptas doloribus eaque non. Dolores ipsum voluptate ducimus aspernatur vero nobis ipsa illo perferendis accusamus laboriosam ea, impedit temporibus?'
        },
        {
          titulo: '<i class="fa fa-exclamation-circle"></i> Mas datos importantes:',
          mensaje: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam ducimus recusandae vel cum excepturi praesentium id ratione eos numquam corporis magnam totam esse voluptas voluptate temporibus, aliquam sapiente placeat cupiditate?'
        }
      ]
    }

    return exits.success({
      modelo
    });

  }


};
