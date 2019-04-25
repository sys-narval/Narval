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
      cantidadSolicitada: 0
    }, //objeto local que permite recibir un articulo

    // Datos del form
    formData: {
      /* … */ },
    syncing: false,
    cloudError: '',
    formErrors: {
      /* … */ },
    formRules: {

    },
    o_cotizacion: {
      lugarEvento: undefined,
      esDiseno: undefined,
      esMontaje: undefined,
      esAlquiler: undefined,
      descripcion: undefined,
      fechaEvento: 0,
      fechaFinEvento: 0,
      fechaMontaje: 0,
      fechaDesmontaje: 0,
      encargado: undefined,
      cliente: undefined,
      contacto: undefined,
      articulos: undefined
    },
    o_cliente: {
      nombre: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined
    },
    o_contacto: {
      nombre: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined,
      cliente: undefined
    },
    l_precioTotal: 0,
    l_cantidadSolicitada: 0,
    l_precioUnitario: 0,
    l_verModalVer: false,
    l_sMontaje: false,
    l_sAlquiler: false,
    l_sDiseno: false,
    l_verModalAgregar: false,
    l_verModalGuardar: false,
    l_sumatoria: 0,
    txtCliente: '',
    txtEmpresa: '',
    l_cliente: undefined,
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
    l_cantidadLibre: 0,
    l_error: false,
    l_date: new Date,
    l_date2: "",
    l_buscarCliente: undefined,
    l_buscarContacto: undefined,
    l_actualizar: false,
    l_filtro: {},
    l_verModalAgregarC: false,
    l_fechaEvento: '',
    l_fechaFinEvento: '',
    l_fechaMontaje: '',
    l_fechaDesmontaje: '',
    l_verModalAgregarCotizacion: false

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: async function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    let respArticulos = await Cloud.extraerInventario();
    let respClientes = await Cloud.extraerClientes();
    let respContactos = await Cloud.extraerContactos();

    this.modelo.articulos = respArticulos.articulos;
    this.modelo.clientes = respClientes;
    this.modelo.contactos = respContactos;
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
        cantidadSolicitada: 0
      }
    },
    limpiar_o_cotizacion: async function()
    {
      this.o_cotizacion = {
        lugarEvento: undefined,
      esDiseno: undefined,
      esMontaje: undefined,
      esAlquiler: undefined,
      descripcion: undefined,
      fechaEvento: 0,
      fechaFinEvento: 0,
      fechaMontaje: 0,
      fechaDesmontaje: 0,
      encargado: undefined,
      cliente: undefined,
      contacto: undefined,
      articulos: undefined
      }
    },
    clickVerModalAgregar: async function () {
      this.o_cliente.nombre = this.l_buscarCliente;
      this.l_verModalAgregar = true
    },
    clickCerrarModalAgregar: async function () {
      this.l_verModalAgregar = false
    },
    clickVerModalAgregarC: async function () {
      this.o_contacto.nombre = this.l_buscarContacto;
     /* if (this.filteredClientes[0].id !== undefined) {

    } else {
      this.l_cliente = await Cloud.extraerCliente(this.filteredClientes[0].cedula);
      this.o_contacto.cliente = this.l_cliente.id;
    }*/
    this.o_contacto.cliente = this.filteredClientes[0].id;
    this.l_verModalAgregarC = true;
    },
    clickCerrarModalAgregarC: async function () {
      this.l_verModalAgregarC = false;
    },
    clickVerModalGuardarCotizacion: async function()
    {
      this.o_cotizacion.esDiseno = this.l_sDiseno;
      this.o_cotizacion.esAlquiler = this.l_sAlquiler;
      this.o_cotizacion.esMontaje = this.l_sMontaje;
      this.o_cotizacion.encargado = this.me.id;
      this.o_cotizacion.articulos = this.l_selecArticulo;
      if(this.l_fechaEvento !== '' && this.fechaFinEvento !== '')
      {

        this.o_cotizacion.fechaEvento = Date.parse(this.l_fechaEvento);
        this.o_cotizacion.fechaFinEvento = Date.parse(this.l_fechaFinEvento);
      }
      if(this.l_fechaMontaje !== '' && this.l_fechaDesmontaje !== '')
      {
        this.o_cotizacion.fechaMontaje = Date.parse(this.l_fechaMontaje);
        this.o_cotizacion.fechaDesmontaje = Date.parse(this.l_fechaDesmontaje);
      }
      this.l_verModalAgregarCotizacion = true;
    },
    clickCerrarModalAgregarCotizacion: async function()
    {
      this.limpiar_o_cotizacion();
      location.reload();
      this.l_verModalAgregarCotizacion = false;
    },
    clickVerModalGuardar: async function () {
     
      this.l_verModalGuardar = true;
    },
    clickCerrarModalGuardar: async function () {
      this.l_verModalGuardar = false
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
      this.l_cantidadSolicitada = 1;
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
      p_articulo.cantidadSolicitada = 1;
      p_articulo.precioTotal = p_articulo.precio;
      for (let index = 0; index < this.l_selecArticulo.length; index++) {
        if (this.l_selecArticulo[index] === p_articulo.id) {
          esta = true;
        }
      }
      if (!esta) {

        this.l_selecArticulo.push(p_articulo.id);
        this.l_articulosTabla.push(p_articulo);
        this.sumatoria();
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
    modificarTabla: function (p_articulo) {
      for (let i = 0; i < this.l_articulosTabla.length; i++) {
        if (this.l_articulosTabla[i].id == p_articulo.id) {
          this.l_articulosTabla[i].precio = p_articulo.precio;
          // this.cerrarModalVer();
        }
      }
      this.sumatoria();
      this.l_verModalVer = false;
    },
    sumatoria: async function () {

      this.l_sumatoria = 0;
      for (let i = 0; i < this.l_articulosTabla.length; i++) {
        if (this.l_articulosTabla[i].precioTotal) {
          this.l_sumatoria += parseInt(this.l_articulosTabla[i].precioTotal);
        }
      }

      //return parseInt(this.l_sumatoria);
    },
    guardarCliente: async function (p_cliente) {
      /*
      this.o_cliente.telefono =  parseInt(this.o_cliente.telefono);
      this.o_cliente.cedula = parseInt(this.o_cliente.cedula);
      */
      this.p_cliente = {};
    //  this.modelo.clientes.push(this.o_cliente);

      this.$forceUpdate();
      this.filtroIDCliente();
      this.clickCerrarModalAgregar();

    },
    guardarContacto: async function (p_contacto) {
      this.p_contacto = {};
   //   this.modelo.contactos.push(this.o_contacto);
      this.$forceUpdate();
      this.filtroIDContacto();
      this.clickCerrarModalAgregarC();
    },
    filtroIDCliente: async function()
    {
      let respClientes = await Cloud.extraerClientes();
      this.modelo.clientes = respClientes;
    },
    filtroIDContacto: async function()
    {
      let respContactos = await Cloud.extraerContactos();
      this.modelo.contactos = respContactos;
    }
  },
  filters: {
    formatoMoneda: function (cantidad) {
      if (typeof cantidad !== 'number') {
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
  computed: {


    filteredContactos: function () {
      const c_limpiaFiltro = objeto => {
        for (let t_atributo in objeto)
          if (objeto[t_atributo] === null || objeto[t_atributo] === undefined || objeto[t_atributo] === '')
            delete objeto[t_atributo];
        return objeto;
      }

      /*
       * Filtramos las articulos que cumplan con el filtro preestablecido por el usuario y que cumpla con
       * que la barra de búsqueda tenga más de un dígito y coincida con la descripción o ubicación.
       */
      if(this.l_buscarContacto !== undefined)
      {

        if (this.l_buscarContacto.length > 3 && this.l_actualizar === false) {
          if (_.filter(this.modelo.contactos, c_limpiaFiltro(this.l_filtro))
          .filter(contacto => contacto.nombre.match(this.l_buscarContacto))[0] !== undefined) {
  
  
          this.o_cotizacion.contacto = _.filter(this.modelo.contactos, c_limpiaFiltro(this.l_filtro))
          .filter(contacto => contacto.nombre.match(this.l_buscarContacto))[0].id;
        }
          return _.filter(this.modelo.contactos, c_limpiaFiltro(this.l_filtro))
            .filter(contacto => contacto.nombre.match(this.l_buscarContacto));
        } else {
          return new Array();
        }
      }else
      {
        return new Array();
      }
    },
    filteredClientes:  function () {

      const c_limpiaFiltro = objeto => {
        for (let t_atributo in objeto)
          if (objeto[t_atributo] === null || objeto[t_atributo] === undefined || objeto[t_atributo] === '')
            delete objeto[t_atributo];
        return objeto;
      }

      /*
       * Filtramos las articulos que cumplan con el filtro preestablecido por el usuario y que cumpla con
       * que la barra de búsqueda tenga más de un dígito y coincida con la descripción o ubicación.
       */
     
        if(this.l_buscarCliente !== undefined)
        {

          if (this.l_buscarCliente.length > 3 && this.l_actualizar === false) {
            if (_.filter(this.modelo.clientes, c_limpiaFiltro(this.l_filtro))
            .filter(cliente => cliente.nombre.match(this.l_buscarCliente) || cliente.telefono.includes(this.l_buscarCliente) || cliente.cedula.includes(this.l_buscarCliente))[0] !== undefined) {
    
    
            this.o_cotizacion.cliente =  _.filter(this.modelo.clientes, c_limpiaFiltro(this.l_filtro))
              .filter(cliente => cliente.nombre.match(this.l_buscarCliente) || cliente.telefono.includes(this.l_buscarCliente) || cliente.cedula.includes(this.l_buscarCliente))[0].id;
          }
            return _.filter(this.modelo.clientes, c_limpiaFiltro(this.l_filtro))
              .filter(cliente => cliente.nombre.match(this.l_buscarCliente) || cliente.telefono.includes(this.l_buscarCliente) || cliente.cedula.includes(this.l_buscarCliente));
          } else {
            return new Array();
          }
        }else
        {
          return new Array();
        }
      
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
    l_cantidadSolicitada(valNew, valOld) {
      /* Esta variable resibe el filtro del articulo del modelo que es 
              igual a el que se utiliza en cada actualizar*/
      let l_cantidadLibre = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadLibre;

      let t_numeroSolicitado = parseInt(this.l_cantidadSolicitada);
      if (this.l_cantidadSolicitada && this.l_cantidadSolicitada <= l_cantidadLibre) {
        this.o_articulo.precioTotal = parseInt(this.o_articulo.precio) * t_numeroSolicitado;
        this.o_articulo.cantidadSolicitada = t_numeroSolicitado;
        this.l_error = false;
      } else {
        this.o_articulo.cantidadSolicitada = 0;
        this.o_articulo.precioTotal = 0;
        this.l_error = true;
      }
    },
    l_precioUnitario(valNew, valOld) {
      let t_precioUnitario = parseInt(this.l_precioUnitario);
      let t_numeroSolicitado = parseInt(this.l_cantidadSolicitada);
      if (this.l_precioUnitario) {
        this.o_articulo.precio = t_precioUnitario;
        this.o_articulo.precioTotal = parseInt(this.o_articulo.precio) * t_numeroSolicitado;
      }

    },
    txtCliente() {
      console.log(this.txtCliente)
    }
  }
});
