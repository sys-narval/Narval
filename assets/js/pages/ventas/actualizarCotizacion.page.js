parasails.registerPage('actualizar-cotizacion', {
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
      /* … */
    },
    syncing: false,
    cloudError: '',
    formErrors: {
      /* … */
    },
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
      jsonArticulos: { articulos: undefined }
    },
    o_cliente: {
      nombre: undefined,
      nombreReal: undefined,
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
    l_prueba: [],
    l_precioTotal: 0,
    l_cantidadSolicitada: 1,
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
    l_verModalAgregarCotizacion: false,
    l_getValor: false,
    t_cotizacion: {encargado:{
      fullName:"",
    }},

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

    this.getGET();

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
    limpiar_o_cotizacion: async function () {
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
    clickVerModalGuardarCotizacion: async function () {
      this.o_cotizacion.esDiseno = this.l_sDiseno;
      this.o_cotizacion.esAlquiler = this.l_sAlquiler;
      this.o_cotizacion.esMontaje = this.l_sMontaje;
      this.o_cotizacion.encargado = this.t_cotizacion.encargado.id;
      if (this.l_fechaEvento !== '' && this.fechaFinEvento !== '') {

        this.o_cotizacion.fechaEvento = Date.parse(this.l_fechaEvento);
        this.o_cotizacion.fechaFinEvento = Date.parse(this.l_fechaFinEvento);
      }
      if (this.l_fechaMontaje !== '' && this.l_fechaDesmontaje !== '') {
        this.o_cotizacion.fechaMontaje = Date.parse(this.l_fechaMontaje);
        this.o_cotizacion.fechaDesmontaje = Date.parse(this.l_fechaDesmontaje);
      }
      if (this.l_articulosTabla.length !== 0) {
        for (let index = 0; index < this.l_articulosTabla.length; index++) {
          this.l_prueba.push({ id: this.l_articulosTabla[index].id, cantidad: this.l_articulosTabla[index].cantidadSolicitada, precio: this.l_articulosTabla[index].precioTotal });
        }
      }
      this.o_cotizacion.jsonArticulos.articulos = this.l_prueba;

      this.l_verModalAgregarCotizacion = true;
    },
    clickCerrarModalAgregarCotizacion: async function () {
      console.log(this.o_cotizacion);
      this.limpiar_o_cotizacion();
      // location.reload();
      location.href = "ventas";
      this.l_prueba = [];
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
      this.l_cantidadSolicitada = p_Articulo.cantidadSolicitada;
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
        // this.l_prueba.push({id:p_articulo.id, cantidad: p_articulo.cantidadSolicitada});
        this.l_articulosTabla.push(p_articulo);
        this.sumatoria();
      }
    },
    quitarArticuloTabla: async function (p_articulo) {
      let t_arregloSalida = [];
      let t_arregloSalida2 = [];
      // let t_prueba = [];
      for (let index = 0; index < this.l_selecArticulo.length; index++) {
        if (this.l_selecArticulo[index] !== p_articulo.id) {
          t_arregloSalida.push(this.l_selecArticulo[index]);
        }
      }

      for (let index = 0; index < this.l_articulosTabla.length; index++) {
        if (this.l_articulosTabla[index].id !== p_articulo.id) {
          t_arregloSalida2.push(this.l_articulosTabla[index]);
        }
        /* if(this.l_prueba[index].id !== p_articulo.id)
         {
           t_prueba.push(this.l_prueba[index]);
         }*/
      }
      //this.l_prueba = t_prueba;
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
    filtroIDCliente: async function () {
      let respClientes = await Cloud.extraerClientes();
      this.modelo.clientes = respClientes;
    },
    filtroIDContacto: async function () {
      let respContactos = await Cloud.extraerContactos();
      this.modelo.contactos = respContactos;
    },
    getGET: async function () {
      // capturamos la url
      var loc = document.location.href;
      // si existe el interrogante
      if (loc.indexOf('?') > 0) {
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        var GET = getString.split('&');
        var get = {};
        // recorremos todo el array de valores
        for (var i = 0, l = GET.length; i < l; i++) {
          var tmp = GET[i].split('=');
          get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        get.variable = parseInt(get.variable);
        let respCotizacion;
        //let t_cotizacion;
        if (get.variable) {
          this.l_getValor = true;
          respCotizacion = await Cloud.extraerCotizacion(get.variable);
          this.t_cotizacion = respCotizacion;
          console.log(this.t_cotizacion.encargado.fullName);
          this.o_cotizacion.id = this.t_cotizacion.id.toString();
          this.o_cotizacion.encargado = this.t_cotizacion.encargado.fullName;
          this.o_cotizacion.lugarEvento = this.t_cotizacion.lugarEvento;
          this.o_cotizacion.descripcion = this.t_cotizacion.descripcion;
          this.l_sDiseno = this.t_cotizacion.esDiseno;
          this.l_sMontaje = this.t_cotizacion.esMontaje;
          this.l_sAlquiler = this.t_cotizacion.esAlquiler;
          for (let t_tempID in this.t_cotizacion.articulos) {
            this.l_selecArticulo.push(this.t_cotizacion.articulos[t_tempID].id);
          }
          this.l_buscarCliente = this.t_cotizacion.cliente.nombre;
          this.l_buscarContacto = this.t_cotizacion.contacto.nombre;
          if (this.t_cotizacion.fechaEvento !== 0) {
            let t_fechaEvento = this.t_cotizacion.fechaEvento;
            t_fechaEvento = new Date(t_fechaEvento);
            let t_diasE = 0;
            t_diasE = new Date(t_fechaEvento.getFullYear(), t_fechaEvento.getMonth()+1, 0).getDate();
            //Fecha inicio del evento validaciones  
            if (t_fechaEvento.getDate() + 1 == 32 && t_diasE == 31) { //Si es el primer dia de un mes o un año 
              t_fechaEvento.setDate(01);
              if ((t_fechaEvento.getMonth() + 2) == 13) { //Si es 31 de diciembre lo que llega
                t_fechaEvento.setMonth(1);
                  this.l_fechaEvento = (t_fechaEvento.getFullYear() + 1) + '-' + '0' + (t_fechaEvento.getMonth()) + '-' + '0' + (t_fechaEvento.getDate());
    
              } else {
                if (t_fechaEvento.getMonth() + 1 > 9) { //Si el mes es mayor a setiembre o mayor a 9 
                  this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());
    
                } else {
                  this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());
                }
              }
            } else if (t_fechaEvento.getDate() + 1 == 31 && t_diasE == 30) { //Si es el primer dia de un mes 
              t_fechaEvento.setDate(01);
              if (t_fechaEvento.getMonth() + 2 > 9) {
                this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());
    
              } else {
                this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());
              }
            } else if ((t_fechaEvento.getDate() + 1 == 29 && t_diasE == 28) || (t_fechaEvento.getDate() + 1 == 30 && t_diasE == 29)) { // Si el mes es febrero
              t_fechaEvento.setDate(01);
              if (t_fechaEvento.getMonth() + 1 == 13) {
                t_fechaEvento.setMonth(1);
                this.l_fechaEvento = (t_fechaEvento.getFullYear() + 1) + '-' + '0' + (t_fechaEvento.getMonth()) + '-' + '0' + (t_fechaEvento.getDate());
    
              } else {
                this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());
              }
    
    
            } else { //Cualquier fecha menos el 1er dia del mes
              if (t_fechaEvento.getMonth() + 1 > 9) {
                if(t_fechaEvento.getDate()+1 > 9)
                {
                  this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' +  (t_fechaEvento.getMonth() + 1) + '-' +  (t_fechaEvento.getDate() + 1);
    
                }else
                {
                  this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' +  (t_fechaEvento.getMonth() + 1) + '-' + '0'+(t_fechaEvento.getDate() + 1);
                }
    
              } else {
    
                if(t_fechaEvento.getDate()+1 > 9)
                {
                  this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 1) + '-' +  (t_fechaEvento.getDate() + 1);
                }else
                {
                  this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 1) + '-' + '0' + (t_fechaEvento.getDate() + 1);
                }
    
              }
            }

            //this.l_fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 1) + '-' + (t_fechaEvento.getDate()+1);

            let t_fechaFinEvento = this.t_cotizacion.fechaFinEvento;
            t_fechaFinEvento = new Date(t_fechaFinEvento);
            let t_dias = 0;
            t_dias = new Date(t_fechaFinEvento.getFullYear(), t_fechaFinEvento.getMonth()+1, 0).getDate();
            //Fecha fin del evento validaciones  
            if (t_fechaFinEvento.getDate() + 1 == 32 && t_dias == 31) { //Si es el primer dia de un mes o un año 
              t_fechaFinEvento.setDate(01); 
              if ((t_fechaFinEvento.getMonth() + 2) == 13) { //Si es diciembre
                t_fechaFinEvento.setMonth(1);
                  this.l_fechaFinEvento = (t_fechaFinEvento.getFullYear() + 1) + '-' + '0' + (t_fechaFinEvento.getMonth()) + '-' + '0' + (t_fechaFinEvento.getDate());
    
              } else { // Si no es diciembre
                if (t_fechaFinEvento.getMonth() + 1 > 9) {
                  this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());
    
                } else {
                  this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());
                }
              }
    
            } else if (t_fechaFinEvento.getDate() + 1 == 31 && t_dias == 30) { //Primer dia de  un mes
              t_fechaFinEvento.setDate(01);
              if (t_fechaFinEvento.getMonth() + 2 > 9) {
                this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());
    
              } else {
    
                this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());
    
              }
    
            } else if ((t_fechaFinEvento.getDate() + 1 == 29 && t_dias == 28) || (t_fechaFinEvento.getDate() + 1 == 30 && t_dias == 29)) { //Si es febrero
              t_fechaFinEvento.setDate(01);
              this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());
    
    
            } else {
              if (t_fechaFinEvento.getMonth() + 1 > 9) {
                if(t_fechaFinEvento.getDate()+1 > 9)
                {
                  this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + (t_fechaFinEvento.getMonth() + 1) + '-' + (t_fechaFinEvento.getDate() + 1);
                }else
                {
                  this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + (t_fechaFinEvento.getMonth() + 1) + '-' + '0'+(t_fechaFinEvento.getDate() + 1);
                }
    
              } else {
                if(t_fechaFinEvento.getDate()+1 > 9)
                {
                  this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 1) + '-' +  (t_fechaFinEvento.getDate() + 1);
                }else
                {
                 
                  this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 1) + '-' + '0' + (t_fechaFinEvento.getDate() + 1);
                }
    
              }
    
            }
            //this.l_fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 1) + '-' + (t_fechaFinEvento.getDate()+1);
          }
          if (this.t_cotizacion.fechaMontaje !== 0) {
            let t_fechaMontaje = this.t_cotizacion.fechaMontaje;
            t_fechaMontaje = new Date(t_fechaMontaje);
            let t_diasM = 0;
            t_diasM = new Date(t_fechaMontaje.getFullYear(), t_fechaMontaje.getMonth()+1, 0).getDate();
            //Fecha iniicio del montaje validaciones  
            if (t_fechaMontaje.getDate() + 1 == 32 && t_diasM == 31) { // Si es el primer dia de un mes o un año
              t_fechaMontaje.setDate(01);
              if (t_fechaMontaje.getMonth() + 2 == 13) { //Si es diciembre
                t_fechaMontaje.setMonth(1);
                  this.l_fechaMontaje = (t_fechaMontaje.getFullYear() + 1) + '-' + '0' + (t_fechaMontaje.getMonth()) + '-' + '0' + (t_fechaMontaje.getDate());
              } else {
                if (t_fechaMontaje.getMonth() + 1 > 9) {
                  this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());
                } else {
                  this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());
                }
              }
            } else if (t_fechaMontaje.getDate() + 1 == 31 && t_diasM == 30) { //Primer dia de un mes
              t_fechaMontaje.setDate(01);
              if (t_fechaMontaje.getMonth() + 2 > 9) {
    
               this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());
    
              } else {
                this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());
              }
    
            } else if ((t_fechaMontaje.getDate() + 1 == 29 && t_diasM == 28) || (t_fechaMontaje.getDate() + 1 == 30 && t_diasM == 29)) { //Si es febrero
              t_fechaMontaje.setDate(01);
              this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());
    
            } else {
              if (t_fechaMontaje.getMonth() + 1 > 9) {
                if(t_fechaMontaje.getDate() + 1 > 9)
                {
                  this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + (t_fechaMontaje.getMonth() + 1) + '-' + (t_fechaMontaje.getDate() + 1);
                }else
                {
                  this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + (t_fechaMontaje.getMonth() + 1) + '-' + '0' + (t_fechaMontaje.getDate() + 1);
                }
    
              } else {
                if(t_fechaMontaje.getDate() + 1 > 9)
                {
                  this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 1) + '-' +(t_fechaMontaje.getDate() + 1);
                }else
                {
                  
                  this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 1) + '-' +'0'+(t_fechaMontaje.getDate() + 1);
                }
    
              }
            }
            //this.l_fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 1) + '-' + (t_fechaMontaje.getDate()+1);

            let t_fechaDesmontaje = this.t_cotizacion.fechaDesmontaje;
            t_fechaDesmontaje = new Date(t_fechaDesmontaje);
            let t_diasD = 0;
            t_diasD = new Date(t_fechaDesmontaje.getFullYear(), t_fechaDesmontaje.getMonth()+1, 0).getDate();
            //Fecha fin del montaje validaciones  
            if (t_fechaDesmontaje.getDate() + 1 == 32 && t_diasD == 31) { //Si es el primer dia de un mes o un año
              t_fechaDesmontaje.setDate(01);
              if (t_fechaDesmontaje.getMonth() + 2 == 13) { // Si es diciembre
                t_fechaDesmontaje.setMonth(1);
                  this.l_fechaDesmontaje = (t_fechaDesmontaje.getFullYear() + 1) + '-' + '0' + (t_fechaDesmontaje.getMonth()) + '-' + '0' + (t_fechaDesmontaje.getDate());
    
              } else {
                if (t_fechaDesmontaje.getMonth() + 1 > 9) {
                  this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());
    
                } else {
                  this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());
                }
              }
            } else if (t_fechaDesmontaje.getDate() + 1 == 31 && t_diasD == 30) { //Primer dia de un mes
              t_fechaDesmontaje.setDate(01);
              if (t_fechaDesmontaje.getMonth() + 2 > 9) {
                this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());
    
              } else {
    
                this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());
    
              }
            } else if ((t_fechaDesmontaje.getDate() + 1 == 29 && t_diasD == 28) || (t_fechaDesmontaje.getDate() + 1 == 30 && t_diasD == 29)) { //Si es febrero
              t_fechaDesmontaje.setDate(01);
              this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());
    
            } else {
              if (t_fechaDesmontaje.getMonth() + 1 > 9) {
                if(t_fechaDesmontaje.getDate() + 1 > 9)
                {
                  this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + (t_fechaDesmontaje.getMonth() + 1) + '-' + '0'+ (t_fechaDesmontaje.getDate() + 1);
                }else
                {
                  this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + (t_fechaDesmontaje.getMonth() + 1) + '-' + (t_fechaDesmontaje.getDate() + 1);
                }
    
              } else {
                if(t_fechaDesmontaje.getDate() + 1 > 9)
                {
                  this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 1) + '-' +'0'+ (t_fechaDesmontaje.getDate() + 1);
                }else
                {
                  
                  this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 1) + '-' +(t_fechaDesmontaje.getDate() + 1);
                }
    
              }
    
            }
            //this.l_fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 1) + '-' + (t_fechaDesmontaje.getDate()+1);
          }

        }

        //return get.variable;
      }
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
      if (this.l_buscarContacto !== undefined) {

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
      } else {
        return new Array();
      }
    },
    filteredClientes: function () {

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

      if (this.l_buscarCliente !== undefined) {

        if (this.l_buscarCliente.length > 3 && this.l_actualizar === false) {
          if (_.filter(this.modelo.clientes, c_limpiaFiltro(this.l_filtro))
            .filter(cliente => cliente.nombre.match(this.l_buscarCliente) || cliente.telefono.includes(this.l_buscarCliente) || cliente.cedula.includes(this.l_buscarCliente))[0] !== undefined) {


            this.o_cotizacion.cliente = _.filter(this.modelo.clientes, c_limpiaFiltro(this.l_filtro))
              .filter(cliente => cliente.nombre.match(this.l_buscarCliente) || cliente.telefono.includes(this.l_buscarCliente) || cliente.cedula.includes(this.l_buscarCliente))[0].id;
          }
          return _.filter(this.modelo.clientes, c_limpiaFiltro(this.l_filtro))
            .filter(cliente => cliente.nombre.match(this.l_buscarCliente) || cliente.telefono.includes(this.l_buscarCliente) || cliente.cedula.includes(this.l_buscarCliente));
        } else {
          return new Array();
        }
      } else {
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

      if (this.l_getValor) {
        for (let t_tempID in this.l_selecArticulo) {

          for (let t_val in this.modelo.articulos) {
            let t_cantidad;
            let t_precio;
            t_cantidad = this.t_cotizacion.articulos.filter(t_articulo => t_articulo.id.includes(this.l_selecArticulo[t_tempID]))[0].cantidad;
            t_precio = this.t_cotizacion.articulos.filter(t_articulo => t_articulo.id.includes(this.l_selecArticulo[t_tempID]))[0].precio;
            if (this.modelo.articulos[t_val].id === this.l_selecArticulo[t_tempID]) {
              this.modelo.articulos[t_val].cantidadSolicitada = t_cantidad;
              this.modelo.articulos[t_val].precioTotal = t_precio;
            }
          }
          t_articulosTabla.push(this.modelo.articulos.filter(t_articulo => t_articulo.id.includes(this.l_selecArticulo[t_tempID]))[0]);
          this.l_articulosTabla.push(this.modelo.articulos.filter(t_articulo => t_articulo.id.includes(this.l_selecArticulo[t_tempID]))[0]);
          this.sumatoria();
        }
        this.l_getValor = false;
      } else {
        for (let t_tempID in this.l_selecArticulo) {
          t_articulosTabla.push(this.modelo.articulos.filter(t_articulo => t_articulo.id.includes(this.l_selecArticulo[t_tempID]))[0]);
        }
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
