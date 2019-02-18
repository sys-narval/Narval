parasails.registerPage('usuarios', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    usuario: { /* */ },
    verModalEditar: false,
    verModalDeshabilitar: false,
    verModalAgregar: false,
    verModalAyuda: false,
    busquedaUsuario: '',
    filtro:{}
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
    modalEditar: async function(usuario){
      this.usuario = usuario;
      this.verModalEditar = true;
    },

    modalDeshabilitar: async function(){
      this.verModalDeshabilitar = true;
    },

    modalAgregar: async function(){
      this.verModalAgregar = true;
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

        if (this.busquedaUsuario) {
          return _.filter(this.modelo.usuarios, limpiaFiltro(this.filtro))
            .filter(usuario => usuario.nombre.includes(this.busquedaUsuario) || usuario.correo.includes(this.busquedaUsuario));
        } else {
          return new Array();
        }
      }
    }
});
