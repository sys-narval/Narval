parasails.registerPage('clientes', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    o_cliente: {
      nombre: undefined,
      telefono: 0,
      correo: undefined
    },
    contactos: [{
      empresa: 'Coca-Cola',
      telefono: 25555555,
      correo: 'coca@gmail.com',
      Contacto: [{
          nombre: 'Jose quesada',
          telefono: 88989899,
          correo: 'jose@gmail.com'
        },
        {
          nombre: 'Mario Porras',
          telefono: 9998555,
          correo: 'mario@gmail.com'
        }
      ]
    },
    {
      empresa: 'Imprerial',
      telefono: 2555555,
      correo: 'imperial@gmail.com',
      Contacto: [{
          nombre: 'Carlos quesada',
          telefono: 88989899,
          correo: 'carlos@gmail.com'
        },
        {
          nombre: 'Juan Porras',
          telefono: 9998555,
          correo: 'juan@gmail.com'
        }
      ]
    }
  ],
  informacion:{},
  l_verModalEditar: false,
  l_verModalAgregar: false,
  l_verModalEliminar: false,
  l_verModalContactos: false,
  l_edito: false
  },
  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
    
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    limpiar_o_cliente: async function()
    {
      this.o_cliente = {
        nombre: undefined,
        telefono: 0,
        correo: undefined
      }
    },
    //…
    clickVerModalEditar: async function(p_empresa){
      this.o_cliente = p_empresa;
      this.l_verModalEditar=true;
    },
    clickCerrarModalEditar: async function()
    {
      this.l_verModalEditar = false
      this.limpiar_o_cliente();
    }, 
    clickVerModalEliminar: async function()
    {
      this.l_verModalEliminar = true
    },
    clickCerrarModalEliminar: async function()
    {
      this.l_verModalEliminar = false
    },
    clickVerModalAgregar: async function()
    {
      this.l_verModalAgregar = true
    },
    clickCerrarModalAgregar: async function()
    {
      this.l_verModalAgregar = false
    },
    clickVerModalContactos: async function(p_cliente)
    {
      this.o_cliente = p_cliente;
      this.l_verModalContactos = true
    },
    clickCerrarModalContactos: async function()
    {
      this.l_verModalContactos = false
    },
    clickEditar: async function()
    {
      this.l_edito = true;
    },
    clickGuardarContactos: async function()
    {
      this.l_verModalContactos = false;
      this.l_edito = false
    }

  }
});
