parasails.registerPage('inventario', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    o_articulo: {},
    l_verModalActualizar: false,
    l_verModalAgregar: false,
    l_verModalEliminar: false,
    arts:{},
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    //this.modeloI.articulos= Cloud.extraerInventario();
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    cerrarModalActualizar: async function(){
      this.l_verModalActualizar = false;
      this.o_articulo = {};
    },
    cerrarModalEliminar: async function(){
      this.l_verModalEliminar = false;
    },
    cerrarNuevo: async function(){
      this.l_verModalAgregar = false;
      this.o_articulo = {};
    },
    crearArticulo: async function(articuloNuevo){
      await Cloud.insertarUnArticulo.with(articuloNuevo);
      this.l_verModalAgregar= false;
      this.articuloNuevo = {};
      this.modeloI.articulos.push(articuloNuevo);
      this.o_articulo = {};
      this.$forceUpdate();
    },
    verModalActualizar: async function(p_articulo){
      this.o_articulo = p_articulo;
      this.l_verModalActualizar = true;
    },
    verModalAgregar: async function(){
      this.l_verModalAgregar = true;
    },
    verModalEliminar: async function(p_articulo){
      this.o_articulo = p_articulo;
      this.l_verModalEliminar = true;
    },
    eliminarUnArticulo: async function(){
      await Cloud.eliminarUnArticulo.with(this.o_articulo);
      this.modeloI.articulos.splice(this.modeloI.articulos.indexOf(this.o_articulo),1);
      this.l_verModalEliminar = false;
      this.$forceUpdate();
    },
    actualizarUnArticulo: async function(p_articulo){
     await Cloud.actualizarUnArticulo.with(this.o_articulo);
     this.o_articulo = {};
      this.l_verModalActualizar = false;
       this.$forceUpdate();
    }

  },
  filters:{
    formatoMoneda: function(cantidad){
      if(typeof cantidad !== 'number'){
        return cantidad;
      }

      let formato = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });
      return formato.format(cantidad);

    }
  }
});
