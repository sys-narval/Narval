module.exports = {


  friendlyName: 'View forgot password',


  description: 'Display "Forgot password" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/forgot-password',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      extendedDescription: 'Logged-in users should change their password in "Account settings."',
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    if (this.req.me) {
      throw {redirect: '/'};
    }

    let modelo = {
      titulo: 'Recuperar contraseña',
      descripcion: 'Ingrese su correo electronico acontinuacion para recuperar la contraseña.',
      errorCorreo: 'Por favor ingrese su correo electronico.',
      link: 'Recuperar',
      errorProceso: 'Se ha generado un error en el proceso, Por favor revise la informacion e intentelo nuevamente, o <a href="/contact">contacte a soporte</a>.',
      regresoLogin: 'Iniciar Sesion.',
      exito: 'Hemos enviado un correo para recuperar la contraseña',
      advertenciaEmail: 'Si el email no llega en los proximos minutos por favor revise su folder de spam. Si aun no lo encuentra por favor <a href="/contact">contacte a soporte</a>.'
    }

    return exits.success({
      modelo
    });

  }


};
