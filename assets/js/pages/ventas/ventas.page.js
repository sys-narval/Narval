parasails.registerPage('ventas', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    o_articulo: {
      id: undefined,
      descripcion: undefined,
      precio: undefined,
      cantidadTotal: undefined,
      categoria: undefined,
      unidadMedida: undefined,
      precioTotal: undefined,
      cantidadSolicitada: undefined
    }, //objeto local que permite recibir un articulo
    VerModalGuardar: false,
    l_precioTotal: 0,
      l_cantidadSolicitada: 0,
      l_precioUnitario: 0,
    l_verModalVer: false,
    l_verModalAgregar: false,
    l_sumatoria: 0,
    txtCliente: '',
    txtEmpresa: '',
    clientes: [{
      name: ''
    }],
    contactos: [{
      name: ''
    }],
    articulo: {},
    verCliente: false,
    verContacto: false,
    l_buscarArticulo: '',
    l_filtro: {},
    l_selecArticulo: [],
    l_canidades: [],
    l_precios: [],
    l_articulosTabla: [],
    l_cantidadLibre: 0
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
    limpiar_o_articulo: async function () {
      this.o_articulo = {
        id: undefined,
        descripcion: undefined,
        precio: undefined,
        cantidadTotal: undefined,
        categoria: undefined,
        unidadMedida: undefined,
        precioTotal: undefined,
        cantidadSolicitada: undefined
      }
    },
    clickVerModalAgregar: async function () {
      this.l_verModalAgregar = true
    },
    clickCerrarModalAgregar: async function () {
      this.l_verModalAgregar = false
    },
    clickVerModalGuardar: async function () {
      this.VerModalGuardar = true
    },
    clickCerrarModalGuardar: async function () {
      this.VerModalGuardar = false
    },
    clickVerClientes: async function (p_name) {
      this.txtCliente = p_name
    },
    clickNoVerClientes: async function () {
      this.txtCliente = ""
    },
    clickVerCliente: async function (p_cliente) {
      this.clientes = p_cliente
      this.verCliente = true
    },
    clickVerContacto: async function (p_contacto) {
      this.contactos = p_contacto
      this.verCliente = true
    },
    verArticulo: async function (p_Articulo) {
      this.o_articulo = p_Articulo
      this.l_precioUnitario = parseInt(p_Articulo.precio)
     this.o_articulo.precio = parseInt(this.o_articulo.precio)
      this.l_verModalVer = true
    },
    cerrarModalVer: async function () {
      this.l_verModalVer = false
      this.sumatoria();
      this.limpiar_o_articulo();
    },
    agregarArticuloTemp: async function (p_articulo) {
      let esta = false;
      for (let index = 0; index < this.l_selecArticulo.length; index++) {
        if (this.l_selecArticulo[index] === p_articulo.id) {
          esta = true;
        }
      }
      if (!esta) {
        this.l_selecArticulo.push(p_articulo.id);
        this.l_articulosTabla.push(p_articulo);
        //this.l_sumatoria += p_articulo.precio;
      }
    },
    quitarArticuloTabla: async function (p_articulo) {
      let t_arregloSalida = [];
      let t_arregloSalida2 = [];
      for (let index = 0; index < this.l_selecArticulo.length; index++) {
        if (this.l_selecArticulo[index] !== p_articulo.id) {
          t_arregloSalida.push(this.l_selecArticulo[index]);
        }
      }

      for (let index = 0; index < this.l_articulosTabla.length; index++) {
        if (this.l_articulosTabla[index].id !== p_articulo.id) {
          t_arregloSalida2.push(this.l_articulosTabla[index]);
        }
      }

      this.l_selecArticulo = t_arregloSalida;
      this.l_articulosTabla = t_arregloSalida2;
      this.sumatoria();

    },
    modificarT: function(p_articulo)
    {
       for(let i = 0; i< this.l_articulosTabla.length; i++)
       {
          if(this.l_articulosTabla[i].id == p_articulo.id)
          { 
            this.l_articulosTabla[i].precio = p_articulo.precio;
            this.cerrarModalVer();
          }
       }
       this.cerrarModalVer();
    },
    sumatoria: async function () {
     
      this.l_sumatoria = 0;
      for (let i = 0; i < this.l_articulosTabla.length; i++) {
        if (this.l_articulosTabla[i].precioTotal) {
          this.l_sumatoria += parseInt(this.l_articulosTabla[i].precioTotal);
        }
      }
    
    //return parseInt(this.l_sumatoria);
    }
  },
  computed: {
    
   /* sumatoria: function () {
     
      this.l_sumatoria = 0;
      for (let i = 0; i < this.l_articulosTabla.length; i++) {
        if (this.l_articulosTabla[i].precioTotal) {
          this.l_sumatoria += parseInt(this.l_articulosTabla[i].precioTotal);
        }
      }
    
    return parseInt(this.l_sumatoria);
    },*/
    filteredContactos: function () {
      return this.contactos.filter((contacto) => {
        return contacto.name.match(this.txtCliente)
      })
    },
    filteredClientes: function () {
      return this.clientes.filter((cliente) => {
        return cliente.name.match(this.txtEmpresa)
      })
    },

    filtroCategorias: function () {
      let l_bandera = false;
      let a_arregloCategoria = [];
      this.filtroArticulos.forEach(element => {
        if (a_arregloCategoria.length === 0) {
          a_arregloCategoria.push(element.categoria);
        } else {
          for (let index = 0; index < a_arregloCategoria.length; index++) {
            if (a_arregloCategoria[index] === element.categoria) {
              l_bandera = true;
              index = a_arregloCategoria.length + 1;
            }
          }
          if (l_bandera === false) {
            a_arregloCategoria.push(element.categoria);
          }
          l_bandera = false;
        }
      });
      return a_arregloCategoria;
    }, //Metodo para filtrar por categorias
    filtroArticulos: function () {
      /*
       * Función para limpiar el filtro a usar, en caso de que el atributo este vacío
       * eliminamos ese atributo del objeto para que no sea evaluado
       */
      const c_limpiaFiltro = objeto => {
        for (let t_atributo in objeto)
          if (objeto[t_atributo] === null || objeto[t_atributo] === undefined || objeto[t_atributo] === '')
            delete objeto[t_atributo];
        return objeto;
      }

      /*preestablecido
       * Filtramos las articulos que cumplan con el filtro preestablecido por el usuario y que cumpla con
       * que la barra de búsqueda tenga más de un dígito y coincida con la descripción o ubicación.
       */
      if (this.l_buscarArticulo.length > 3) {
        let t_arregloSalida = [];
        let t_arregloSalida2 = [];
        t_arregloSalida = _.filter(this.modelo.articulos, c_limpiaFiltro(this.l_filtro))
          .filter(articulo => articulo.descripcion.includes(this.l_buscarArticulo) || articulo.categoria.includes(this.l_buscarArticulo) || articulo.id.includes(this.l_buscarArticulo));
        for (let index = 0; index < t_arregloSalida.length; index++) {
          if (t_arregloSalida[index].descripcion === this.l_buscarArticulo) {
            t_arregloSalida2.push(t_arregloSalida[index]);
          }
          if (t_arregloSalida[index].id == this.l_buscarArticulo) {
            t_arregloSalida2.push(t_arregloSalida[index]);
          }
        }
        return t_arregloSalida2;
      } else if (this.l_buscarArticulo === "*" && this.l_actualizar === false) {
        return this.modelo.articulos;
      } else {
        return new Array();
      }
    },
    filtroDeTabla: function () {
      
      let t_articulosTabla = [];
      for (let t_tempID in this.l_selecArticulo) {
        t_articulosTabla.push(this.modelo.articulos.filter(t_articulo => t_articulo.id.includes(this.l_selecArticulo[t_tempID]))[0]);
        
      }
      return t_articulosTabla;
    },
  },
  watch: {
    l_cantidadSolicitada(valNew, valOld)
    {
      /* Esta variable resibe el filtro del articulo del modelo que es 
              igual a el que se utiliza en cada actualizar*/
          let l_cantidadLibre = _.find(this.modelo.articulos, {
            id: this.o_articulo.id
          }).cantidadLibre;
          
          let t_numeroSolicitado = parseInt(this.l_cantidadSolicitada);
          if(this.l_cantidadSolicitada)
          {
            this.o_articulo.precioTotal = parseInt(this.o_articulo.precio) * t_numeroSolicitado;
            this.o_articulo.cantidadSolicitada = t_numeroSolicitado;
          }
    },
    l_precioUnitario(valNew, valOld)
    {
        let t_precioUnitario = parseInt(this.l_precioUnitario);
        let t_numeroSolicitado = parseInt(this.l_cantidadSolicitada);
        if(this.l_precioUnitario)
        { 
          this.o_articulo.precio = t_precioUnitario;
          this.o_articulo.precioTotal = parseInt(this.o_articulo.precio) * t_numeroSolicitado;
        }

    },
    txtCliente() {
      console.log(this.txtCliente)
    }
  }
});
