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
      unidadMedida: undefined
    }, //objeto local que permite recibir un articulo
    VerModalGuardar: false,
    l_verModalVer: false,
    l_verModalAgregar: false,
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
        unidadMedida: undefined
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
    clickVerClientes: async function (name) {
      this.txtCliente = name
    },
    clickNoVerClientes: async function () {
      this.txtCliente = ""
    },
    clickVerCliente: async function (cliente) {
      this.clientes = cliente
      this.verCliente = true
    },
    clickVerContacto: async function (vcontacto) {
      this.contactos = vcontacto
      this.verCliente = true
    },
    verArticulo: async function (vArticulo) {
      this.o_articulo = vArticulo
      this.l_verModalVer = true
    },
    cerrarModalVer: async function () {
      this.l_verModalVer = false
      this.limpiar_o_articulo();
    },
    agregarArticuloTemp: async function (p_articulo) {
      let esta = false;
      for (let index = 0; index < this.l_selecArticulo.length; index++) {
        if (this.l_selecArticulo[index] === p_articulo) {
          esta = true;
        }
      }
      if (!esta) {
        this.l_selecArticulo.push(p_articulo)
      }
    },
    quitarArticuloTabla: async function (p_articulo) {
      let t_arregloSalida = [];
      for (let index = 0; index < this.l_selecArticulo.length; index++) {
        if (this.l_selecArticulo[index] !== p_articulo.id) {
          t_arregloSalida.push(this.l_selecArticulo[index]);
        }
      }
      this.l_selecArticulo = t_arregloSalida;

    },
  },
  computed: {
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
    txtCliente() {
      console.log(this.txtCliente)
    }
  }
});
