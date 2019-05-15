module.exports = {


  friendlyName: 'View login',


  description: 'Display "Login" page.',

  

  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/login',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs, exits) {

    if (this.req.me) {
      throw {redirect: '/'};
    }

    let modelo = {
      titulo: 'Iniciar Sesion',
      errorCorreo: 'Por favor ingresar un correo valido.',
      errorContrasena: 'Por favor ingrese su contraseña.',
      recordarme: 'Recordarme',
      errorCredenciales: 'Las cedenciales no estan asociadas a ninguna cuenta. Por favor revise el correo o la contraseña.',
      errorCargar: 'Se ha producido un error al cargar la pagina por favor intente de nuevo, o <a href="/contact">contacte a soporte</a> si el error persiste.',
      ingresar: 'Ingresar',
      olvidoContrasena: 'Olvide Contraseña'
    }

    return exits.success({
      modelo
    });

  }


};
