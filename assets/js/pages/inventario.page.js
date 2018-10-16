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
    //…
    verArticulo: async function(p_articulo){
      this.articulo = p_articulo;
      this.verModalA = true;
    },

    cerrarEvento: async function(){
      this.verModalA = false;
    },
    crearArticulo: async function(articuloNuevo){
      await Cloud.insertarUnArticulo.with(articuloNuevo);
      this.verModalAgregar= false;
      this.articuloNuevo = {};
      this.modeloI.articulos.push(articuloNuevo);
      this.$forceUpdate();
    },
    cerrarNuevo: async function(){
      this.verModalAgregar = false;
    },
    verModalAgr: async function(){
      this.verModalAgregar = true;
    },
    verModalEli: async function(p_articulo){
      this.articulo = p_articulo;
      this.verModalEliminar = true;
    },
    eliminar: async function(){
      await Cloud.eliminarUnArticulo.with(this.articulo);
      this.modeloI.articulos.splice(this.modeloI.articulos.indexOf(this.articulo),1);
      this.verModalEliminar = false;
      this.$forceUpdate();
    },
    actualizar: async function(p_articulo)
    {
       this.modeloI.articulos.map(articulo => {
        if(articulo.id === p_articulo.id){
          articulo = p_articulo;
        }
      })

      /*this.modeloI.articulos.forEach(function(art){
        if(art.id === this.articulo.id)
        {
          console.log(art.id);
        }
      });*/
      
      this.verModalA = false;
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
