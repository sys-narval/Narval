parasails.registerPage('clientes', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    o_cliente: {
      nombre: undefined,
      nombreReal: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined,
      activo: undefined,
      id: undefined
    },
    o_contacto: {
      nombre: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined,
      cliente: undefined,
      activo: undefined
    },
   
    informacion: {},
    l_verModalEditar: false,
    l_verModalAgregar: false,
    l_verModalEliminar: false,
    l_verModalContactos: false,
    l_verModalAgregarContactos: false,
    l_verModalAyuda: false,
    l_edito: false,
    l_buscarCliente: '',
    l_actualizar: false,
    l_filtro: {},
    l_editarUnContacto: {
      nombre: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined,
      cliente: undefined,
      activo: undefined
    },
    l_cliente: undefined,
    //cliente editado

    l_contacto: {
      nombre: undefined,
      telefono: undefined,
      correo: undefined,
      cedula: undefined,
      cliente: undefined,
      activo: undefined
    },

    // Datos del form
    formData: {
      /* … */ },
    syncing: false,
    cloudError: '',
    formErrors: {
      /* … */ },
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
  beforeMount: async function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    let respClientes = await Cloud.extraerClientes();
    let respContactos = await Cloud.extraerContactos();

    this.modelo.clientes = respClientes;
    this.modelo.contactos = respContactos;
    console.log(respContactos);
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
        nombreReal: undefined,
        telefono: undefined,
        correo: undefined,
        cedula: undefined,
        activo: undefined,
        id: undefined
      }
    },
    limpiar_o_contacto: async function () {
      this.o_contacto = {
        nombre: undefined,
        telefono: undefined,
        correo: undefined,
        cedula: undefined,
        cliente: undefined,
        activo: undefined
      }
    },
    //…
    clickVerModalEditar: async function (p_empresa) {
      this.o_cliente = p_empresa;
      this.l_verModalEditar = true;
    },
    clickCerrarModalEditar: async function () {
      this.limpiar_o_cliente();
      this.l_verModalEditar = false
    },
    clickVerModalAyuda: async function () {
      this.l_verModalAyuda = true;
    },
    clickCerrarModalAyuda: async function () {
      this.l_verModalAyuda = false;
    },
    clickVerModalEliminar: async function (p_cliente) {
      this.o_cliente = p_cliente;
      this.l_verModalEliminar = true
    },
    clickCerrarModalEliminar: async function () {
      this.l_verModalEliminar = false;
      this.l_actualizar = false
    },
    clickVerModalAgregar: async function () {
      this.limpiar_o_cliente();
      this.l_verModalAgregar = true
    },
    clickCerrarModalAgregar: async function () {
      this.l_verModalAgregar = false
      this.formErrors = {};
      this.limpiar_o_cliente();
      
    },
    clickVerModalAgregarContactos: async function (p_cliente) {
      if(p_cliente.id)
      {
        this.o_contacto.cliente = p_cliente.id;

      }else{
        p_cliente =  await Cloud.extraerCliente(p_cliente.cedula);
        this.o_contacto.cliente = p_cliente.id;
      }
      this.l_verModalAgregarContactos = true;
    },
    clickCerrarModalAgregarContactos: async function () {
      this.limpiar_o_contacto();
      this.l_verModalAgregarContactos = false;
    },
    clickVerModalContactos: async function (p_cliente) {
      this.modelo.contactos = await Cloud.extraerContactos();
      if(p_cliente.id)
      {
        this.o_cliente = p_cliente;

      }else
      {
        p_cliente = await Cloud.extraerCliente(p_cliente.cedula);
        this.o_cliente = p_cliente;
      }
      this.l_verModalContactos = true
    },
    clickCerrarModalContactos: async function () {
      this.l_verModalContactos = false;
      this.o_contacto = {
        nombre: undefined,
        telefono: undefined,
        correo: undefined,
        cedula: undefined
      };
      this.l_contacto = {
        nombre: undefined,
        telefono: undefined,
        correo: undefined,
        cedula: undefined
      };
      this.l_editarUnContacto = {
        nombre: undefined,
        telefono: undefined,
        correo: undefined,
        cedula: undefined
      };
      this.l_edito = false;

    },
    clickEditar: async function (p_contacto) {
      this.o_contacto = p_contacto;
      this.l_contacto = p_contacto;
      this.l_editarUnContacto = p_contacto;
      this.l_edito = true;
    },
    clickGuardarContactos: async function (p_contacto) {
      this.l_verModalContactos = false;
      this.l_edito = false;
      this.p_contacto = {};
      this.o_contacto.activo = true;
      this.modelo.contactos.push(this.o_contacto);
     // this.modelo.clientes.find(cliente=> cliente.id === this.o_contacto.cliente).contactos.push(this.o_contacto); 
      this.clickCerrarModalAgregarContactos();
    },
    guardarCliente: async function (p_cliente) {
      /*
      this.o_cliente.telefono =  parseInt(this.o_cliente.telefono);
      this.o_cliente.cedula = parseInt(this.o_cliente.cedula);
      */
      this.p_cliente = {};
      this.o_cliente.activo = true;
      this.modelo.clientes.push(this.o_cliente);

      this.$forceUpdate();
      this.clickCerrarModalAgregar();

    },
    actualizarContacto: async function () {
      alert("Editado Correctamente");
      this.l_edito = false;
    },
    actualizarCliente: async function (p_cliente) {

      this.$forceUpdate();
      this.clickCerrarModalEditar();
    },
    insertarContacto: async function (p_contacto) {
      this.$forceUpdate();
      this.clickCerrarModalAgregarContactos();
    },
    eliminarContacto: async function () {
      await Cloud.eliminarContacto.with(this.o_contacto);
      this.modelo.contactos = this.modelo.contactos.map(contacto => {
        if (contacto.cedula === this.o_contacto.cedula) {
          contacto.activo = false;
        }
        return contacto;
      });
    },
    eliminarCliente: async function () {
      await Cloud.eliminarCliente.with(this.o_cliente);
      this.modelo.clientes = this.modelo.clientes.map(cliente => {
        if (cliente.cedula === this.o_cliente.cedula) {
          cliente.activo = false;
        }
        return cliente;
      });
      this.l_actualizar = true;
      this.clickCerrarModalEliminar();
      this.$forceUpdate();

    },
    activarCliente: async function (p_cliente) {
      p_cliente.activo = true;
      await Cloud.actualizarCliente.with(p_cliente);
      this.actualizarUnCliente(p_cliente);
    },
    actualizarUnCliente: async function (p_cliente) {

      this.modelo.clientes = this.modelo.clientes.map(cliente => {
        if (cliente.cedula === this.o_cliente.cedula) {
          cliente = this.o_cliente;
        }
        return cliente;
      });

      this.$forceUpdate();
    },
    activarContacto: async function (p_contacto) {
      p_contacto.activo = true;
      await Cloud.actualizarContacto.with(p_contacto);
      this.actualizarUnContacto(p_contacto);
    },
    actualizarUnContacto: async function (p_contacto) {
      this.modelo.contactos = this.modelo.contactos.map(contacto => {
        if (contacto.cedula === this.o_contacto.cedula) {
          contacto = this.o_contacto;
        }
        return contacto;
      });

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
        console.log( c_limpiaFiltro(this.l_filtro));
        return _.filter(this.modelo.clientes, c_limpiaFiltro(this.l_filtro))
          .filter(cliente => cliente.nombre.toUpperCase().includes(this.l_buscarCliente.toUpperCase()) || cliente.telefono.includes(this.l_buscarCliente) || cliente.cedula.includes(this.l_buscarCliente));
      } else if (this.l_buscarCliente === "*" && this.l_actualizar === false) {
        return this.modelo.clientes;
      } else {
        return new Array();
      }
    }
  }
});
