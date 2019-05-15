module.exports = {


  friendlyName: 'View signup',


  description: 'Display "Signup" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/signup',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs, exits) {

    if (this.req.me) {
      throw {
        redirect: '/'
      };
    }

    let modelo = {
      titulo: 'Crear tu cuenta.',
      descripcion: 'Bienvenido por primera vez al <b>Sistema Narval</b>',
      nombre: 'Nombre completo',
      errorNombre: 'Por favor ingrese su nombre completo.',
      correoElectronico: 'Correo electronico',
      errorCorreo: 'Por favor ingrese un correo valido.',
      contrasena: 'Ingrese la contraseña',
      errorContrasena: 'Por favor ingrese una contraseña',
      confirmarContrasena: 'Confirmar contraseña',
      contrasenaNoCoincide: 'Contraseña no coincide',
      terminos: 'He leido &amp; aceptado los <a target="_blank" href="/terms">terminos del servicio</a>.',
      usuarioExiste: 'Parece que ya hay una cuenta con este correo. Si olvido la contraseña puede recuperarla <a href="password/forgot">aqui</a>.',
      errorProceso: 'Parece que ocurrio un error en el prceso de creacion. Por favor verifique la informacion e intente de nuevo, o <a href="/support">contacte a soporte</a> si el error persiste.',
      crearCuenta: 'Crear cuenta.',
      tieneCuenta: 'Tienes cuenta? <a href="/login">Inicia Sesion</a>',
      verifiqueCorreo: 'Verifique su correo.',
      cuentaCasiLista: 'Su cuenta casi esta lista. Todo lo que necesita es darle click al link que te enviamos a <strong>{{formData.emailAddress}}</strong>.',
      irInicio: '<a class="btn btn-outline-info" href="/">Regresar a inicio</a>'
    }

    return exits.success({
      modelo
    });

  }


};
