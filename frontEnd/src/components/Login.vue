<template>
  <section class="login-block">
  <div class="container">
   <div class="row center">
    <div class="col-md-4 offset-md-4">
      <div class="form-panel forms">
        <form>
          <!-- Aqui comienza el form de Sistema Narval -->
          <img class="logo" src="../assets/logoEmpresa.jpg"/>
        <div class="formGroupCenter form-group">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-user"></i>
              </div>
            </div>
            <input type="email" class="form-control" placeholder="Correo electronico">
          </div>
        </div>
        <!-- Aqui termina el correo -->
        <div class="formGroupCenter form-group">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-lock"></i>
              </div>
            </div>
            <input type="password" class="form-control" placeholder="Contraseña">
          </div>
        </div>
        <div>
          <button class="botonAceptar btn btn-lg btn-primary btn-block btn-signin" type="submit"> Aceptar </button>
          <br>
          <center><a href="" style="color:blue"> Registrarse </a></center>
          <a href=""> <img class="ayuda" src="../assets/ayuda.png"></a>
        </div>
        </form>
      </div>
      </div>
  </div>
  </div>
  </section>
</template>
<script>
export default {

}
</script>
<style lang="css">
.center {
  margin-top: 10%;
}
.forms{
    height: 375px;
    width: 375px;
    background-color: #92ACA8;
    border:3px solid;
    border-radius: 10px;
}
.formGroupCenter{
  height: 40%;
  width: 90%;
  margin-left: 5%;
  margin-top: 5%
}
.botonAceptar{
  margin-left: 35%;
  width: 30%;
  background: blue;
}
body{
    background-image: url("../assets/imago.jpg");
    }
.logo{
  margin-top: 5%;
   margin-left:35% ;
   width: 100px;
   height: 75px;
   color: #92ACA8;
    }
  .ayuda{
    margin-left: 90%;
    width: 30px;
   height: 25px;
  }
</style>
