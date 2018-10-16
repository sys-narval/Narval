parasails.registerPage('inventario', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    articulo: {},
    verModalA: false,
    verModalAgregar: false,
    verModalEliminar: false,
    articuloNuevo:{},
    arts:{}
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
    verArticulo: async function(art){
      this.articulo = art;
      this.verModalA = true;
    },

    cerrarEvento: async function(){
      this.verModalA = false;
    },
    crearArticulo: async function(articuloNuevo){
      this.articuloNuevo = articuloNuevo;
      articuloNuevo = {}
      this.modeloI.articulos.push(this.articuloNuevo);
      this.verModalAgregar= false;
      this.articuloNuevo = {};
    },
    cerrarNuevo: async function(){
      this.verModalAgregar = false;
    },
    verModalAgr: async function(){
      this.verModalAgregar = true;
    },
    verModalEli: async function(art){
      this.articulo = art;
      this.verModalEliminar = true;
    },
    eliminar: async function(){
      this.modeloI.articulos.splice(this.modeloI.articulos.indexOf(this.articulo),1);
      this.verModalEliminar = false;
    },
    actualizar: async function(p_arts)
    {
      this.arts = p_arts;
      this.modeloI.articulos.forEach(function(art){
        if(art.id === this.articulo.id)
        {
          console.log(art.id);
        }
      });
      
      this.verModalA = false;
    }

  }
});
