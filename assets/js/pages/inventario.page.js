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
    busquedaArticulo: '',
    filtro: {}
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
       /*this.modeloI.articulos.map(articulo => {
        if(articulo.id === p_articulo.id){
          articulo = p_articulo;
        }
      })*/

     await Cloud.actualizarUnArticulo.with(this.articulo);
      this.verModalA = false;
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
  },
  computed:
  {
    filtroArticulo: function()
    {
      /*
        * Función para limpiar el filtro a usar, en caso de que el atributo este vacío
        * eliminamos ese atributo del objeto para que no sea evaluado
        */
       const limpiaFiltro = objeto => {
        for (let atributo in objeto)
          if (objeto[atributo] === null || objeto[atributo] === undefined || objeto[atributo] === '')
            delete objeto[atributo];
        return objeto;
      }

      /*
      * Filtramos las cotizaciones que cumplan con el filtro preestablecido por el usuario y que cumpla con
      * que la barra de búsqueda tenga más de un dígito y coincida con la descripción o ubicación.
      */
      if (this.busquedaArticulo) {
        return _.filter(this.modeloI.articulos, limpiaFiltro(this.filtro))
          .filter(articulo => articulo.descripcion.includes(this.busquedaArticulo) || articulo.id.includes(this.busquedaArticulo));
      } else {
        return new Array();
      }
    }
  }
});
