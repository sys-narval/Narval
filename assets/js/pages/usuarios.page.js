parasails.registerPage('usuarios', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    o_usuario: { /* */ },
    verModalEditar: false,
    verModalDeshabilitar: false,
    verModalAgregar: false,
    verModalAyuda: false,
    verModalHabilitar: false,
    busquedaUsuario: '',
    filtro:{
      administrador: false,
      ti: false,
      secretario: false,
      vendedor: false,
      bodega: false
    },
    formData: { /* … */ },
    syncing: false,
    cloudError: '',
    formErrors: { /* … */ },
    formRules: {
      id: {
        required: true
      },
      rol: {
        required: true
      }

    }
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: async function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    let respUsuarios = await Cloud.extraerUsuarios();
    this.modelo.usuarios = respUsuarios;
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
    modalEditar: async function(p_usuario){
      this.o_usuario = p_usuario;
      this.verModalEditar = true;
    },

    modalDeshabilitar: async function(p_usuario){
      this.o_usuario = p_usuario;
      this.verModalDeshabilitar = true;
    },
    modalHabilitar: async function(p_usuario){
      this.o_usuario = p_usuario;
      this.verModalHabilitar = true;
    },

    modalAgregar: async function(){
    //  this.verModalAgregar = true;
    location.href="logout";
    },

    modalAyuda: async function(){
      this.verModalAyuda = true;
    },

    cerrarEditar: async function(){
      this.verModalEditar = false;
    },

    cerrarDeshabilitar: async function(){
      this.verModalDeshabilitar = false;
    },

    cerrarAgregar: async function(){
      this.verModalAgregar = false;
    },
    cerrarHabilitar: async function()
    {
      this.verModalHabilitar = false;
    },
    cerrarAyuda: async function(){
      this.verModalAyuda = false;
    }
  },

    //Metodo del filtro
    computed:{
      filtroUsuario: function () {
        const limpiaFiltro = objeto => {
          for (let atributo in objeto)
            if (objeto[atributo] === null || objeto[atributo] === undefined || objeto[atributo] === '')
              delete objeto[atributo];
          return objeto;
        }

        if (this.busquedaUsuario.length > 3) {
          return _.filter(this.modelo.usuarios, limpiaFiltro(this.filtro))
            .filter(usuario => usuario.nombre.includes(this.busquedaUsuario) || usuario.correo.includes(this.busquedaUsuario));
        } else if(this.busquedaUsuario  == "*") 
        {
          return this.modelo.usuarios;

        }else if(this.busquedaUsuario == "**" && this.filtro.administrador)
        {
          let t_usuarios = [];
          for(let index = 0; index < this.modelo.usuarios.length; index++)
          {
            if(this.modelo.usuarios[index].rol == "Administrador")
            {
              t_usuarios.push(this.modelo.usuarios[index]);

            }
          }
          return t_usuarios;

        }else if(this.busquedaUsuario == "**" && this.filtro.ti)
        {
          let t_usuarios = [];
          for(let index = 0; index < this.modelo.usuarios.length; index++)
          {
            if(this.modelo.usuarios[index].rol == "TI")
            {
              t_usuarios.push(this.modelo.usuarios[index]);

            }
          }
          return t_usuarios;

        }else if(this.busquedaUsuario == "**" && this.filtro.secretario)
        {
          let t_usuarios = [];
          for(let index = 0; index < this.modelo.usuarios.length; index++)
          {
            if(this.modelo.usuarios[index].rol == "Secretario")
            {
              t_usuarios.push(this.modelo.usuarios[index]);

            }
          }
          return t_usuarios;

        }else if(this.busquedaUsuario == "**" && this.filtro.vendedor)
        {
          let t_usuarios = [];
          for(let index = 0; index < this.modelo.usuarios.length; index++)
          {
            if(this.modelo.usuarios[index].rol == "Vendedor")
            {
              t_usuarios.push(this.modelo.usuarios[index]);

            }
          }
          return t_usuarios;

        }else if(this.busquedaUsuario == "**" && this.filtro.bodega)
        {
          let t_usuarios = [];
          for(let index = 0; index < this.modelo.usuarios.length; index++)
          {
            if(this.modelo.usuarios[index].rol == "Bodega")
            {
              t_usuarios.push(this.modelo.usuarios[index]);

            }
          }
          return t_usuarios;

        }

        else{
          return new Array();
        }
      }
    }
});
