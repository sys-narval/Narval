<template>
  <div class="container">
   <div class="row center">
    <div class="col-md-4 offset-md-4">
        <form border=2>
        <div class="form-group">
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
        <div class="form-group">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-lock"></i>
              </div>
            </div>
            <input type="password" class="form-control" placeholder="Contraseña">
          </div>
        </div>
        </form>
      </div>
  </div>
  </div>
</template>
<script>
export default {
}
</script>
<style>
  .center{
    margin-top: 20%;
  }
</style>
