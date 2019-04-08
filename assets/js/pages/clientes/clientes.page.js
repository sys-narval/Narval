parasails.registerPage('clientes', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    o_cliente: {
      nombre: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined
    },
    o_contacto:{
      nombre: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined
    },
    contactos: [{
      nombre: 'Coca-Cola',
      telefono: 25555555,
      correo: 'coca@gmail.com',
      cedula: 1012345678,
      Contacto: [{
        nombre: 'Jose quesada',
        telefono: 88989899,
        correo: 'jose@gmail.com',
        cedula: 1012345678,
      },
      {
        nombre: 'Mario Porras',
        telefono: 9998555,
        correo: 'mario@gmail.com',
        cedula: 1012345679,
      }
      ]
    },
    {
      nombre: 'Imprerial',
      telefono: 2555555,
      correo: 'imperial@gmail.com',
      cedula: 1012345679,
      Contacto: [{
        nombre: 'Carlos quesada',
        telefono: 88989899,
        correo: 'carlos@gmail.com',
        cedula: 1012345678,
      },
      {
        nombre: 'Juan Porras',
        telefono: 9998555,
        correo: 'juan@gmail.com',
        cedula: 1012345679,
      }
      ]
    }
    ],
    informacion: {},
    l_verModalEditar: false,
    l_verModalAgregar: false,
    l_verModalEliminar: false,
    l_verModalContactos: false,
    l_verModalAgregarContactos: false,
    l_edito: false,
    l_buscarCliente:'',
    l_actualizar:false,
    l_filtro: {},
    l_editarUnContacto: {
      nombre: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined
    },

    //cliente editado

    l_contacto: {
      nombre: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined
    },

    // Datos del form
    formData: { /* … */ },
    syncing: false,
    cloudError: '',
    formErrors: { /* … */ },
    formRules: {
      nombre: {
        required: true
      },
      telefono: {
        required: true
      },
      correo: {
        required: true
      },
      cedula: {
        required: true
      },

    },
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
    limpiar_o_cliente: async function () {
      this.o_cliente = {
        nombre: undefined,
        telefono: undefined,
        correo: undefined,
        cedula: undefined
      }
    },
    //…
    clickVerModalEditar: async function (p_empresa) {
      this.o_cliente = p_empresa;
      this.l_verModalEditar = true;
    },
    clickCerrarModalEditar: async function () {
      this.l_verModalEditar = false
    },
    clickVerModalEliminar: async function (p_cliente) {
      this.o_cliente = p_cliente;
      this.l_verModalEliminar = true
    },
    clickCerrarModalEliminar: async function () {
      this.l_verModalEliminar = false
    },
    clickVerModalAgregar: async function () {
      this.l_verModalAgregar = true
    },
    clickCerrarModalAgregar: async function () {
      this.l_verModalAgregar = false
      this.formErrors = {};
      this.limpiar_o_cliente();
    },
    clickVerModalAgregarContactos: async function()
    {
      this.l_verModalAgregarContactos = true;
    },
    clickCerrarModalAgregarContactos: async function()
    {
      this.l_verModalAgregarContactos = false;
    },
    clickVerModalContactos: async function (p_cliente) {
      this.o_cliente = p_cliente;
      this.l_verModalContactos = true
    },
    clickCerrarModalContactos: async function () {
      this.l_verModalContactos = false;
      this.o_contacto = {nombre: undefined,
        telefono: undefined,
        correo: undefined,
        cedula: undefined};
        this.l_contacto = {nombre: undefined,
          telefono: undefined,
          correo: undefined,
          cedula: undefined};
      this.l_editarUnContacto= {nombre: undefined,
        telefono: undefined,
        correo: undefined,
        cedula: undefined};
      this.l_edito=false;

    },
    clickEditar: async function (p_contacto) {
      this.o_contacto = p_contacto;
      this.l_contacto = p_contacto;
      this.l_editarUnContacto = p_contacto;
      this.l_edito = true;
    },
    clickGuardarContactos: async function () {
      this.l_verModalContactos = false;
      this.l_edito = false
    },
    guardarCliente: async function (p_cliente) {
      /*
      this.o_cliente.telefono =  parseInt(this.o_cliente.telefono);
      this.o_cliente.cedula = parseInt(this.o_cliente.cedula);
      */
      this.p_cliente = {};
      this.modelo.clientes.push(this.o_cliente);

      this.$forceUpdate();
      this.clickCerrarModalAgregar();

    },
    actualizarContacto: async function(p_contacto){

    },
    actualizarCliente: async function(p_cliente){

      this.$forceUpdate();
      this.clickCerrarModalEditar();
    },
    insertarContacto: async function (p_contacto) {
      this.$forceUpdate();
      this.clickCerrarModalAgregarContactos();
    },
    eliminarContacto: async function(p_contacto){

    },
    eliminarCliente: async function()
    {
      await Cloud.eliminarCliente.with(this.o_cliente);
      this.clickCerrarModalEliminar();
      this.$forceUpdate();
    }

  },
  computed: {
    filtroClientes: function () {
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

      /*
       * Filtramos las articulos que cumplan con el filtro preestablecido por el usuario y que cumpla con
       * que la barra de búsqueda tenga más de un dígito y coincida con la descripción o ubicación.
       */
      if (this.l_buscarCliente.length > 3 && this.l_actualizar === false) {
        return _.filter(this.modelo.clientes, c_limpiaFiltro(this.l_filtro))
          .filter(cliente => cliente.nombre.includes(this.l_buscarCliente) || cliente.telefono.includes(this.l_buscarCliente) || cliente.cedula.includes(this.l_buscarCliente));
      } else if (this.l_buscarCliente === "*" && this.l_actualizar === false) {
        return this.modelo.clientes;
      } else {
        return new Array();
      }
    }
  }
});
