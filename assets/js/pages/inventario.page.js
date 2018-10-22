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
      this.o_articulo = {};
    },
    cerrarNuevo: async function(){
      this.l_verModalAgregar = false;
      this.o_articulo = {};
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
    crearArticulo: async function(articuloNuevo){
      this.o_articulo.cantidadLibre= this.o_articulo.cantidadTotal;
      this.o_articulo.cantidadDanado=0;
      this.o_articulo.cantidadUso=0;
      this.o_articulo.cantidadReservado=0;
      await Cloud.insertarUnArticulo.with(articuloNuevo);
      this.l_verModalAgregar= false;
      this.articuloNuevo = {};
      this.modelo.articulos.push(articuloNuevo);
      this.o_articulo = {};
      this.$forceUpdate();
    },
    eliminarUnArticulo: async function(){
      await Cloud.eliminarUnArticulo.with(this.o_articulo);
      this.modelo.articulos.splice(this.modelo.articulos.indexOf(this.o_articulo),1);
      this.l_verModalEliminar = false;
      this.o_articulo = {};
      this.$forceUpdate();
    },
    actualizarUnArticulo: async function(p_articulo){
     await Cloud.actualizarUnArticulo.with(this.o_articulo);
     this.o_articulo = {};
      this.l_verModalActualizar = false;
       this.$forceUpdate();
    },
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
    },
  },
  computed:{
    filtroCategorias: function(){
      let l_bandera=false;
      let a_arregloCategoria =[];
      this.modelo.articulos.forEach(element => {
        if(a_arregloCategoria.length===0){
          a_arregloCategoria.push(element.categoria);
        }else{
          for (let index = 0; index < a_arregloCategoria.length; index++) {
             if(a_arregloCategoria[index]===element.categoria){
               l_bandera=true;
               index=a_arregloCategoria.length+1;
             }
          }
          if(l_bandera===false){
            a_arregloCategoria.push(element.categoria);
          } 
          l_bandera=false;
        }
      });
      return a_arregloCategoria;
    }
  }
  
});
