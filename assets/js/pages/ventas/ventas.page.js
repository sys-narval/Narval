parasails.registerPage('ventas', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    VerModalGuardar: false,
    txtCliente:'',
    clientes: {},
    contactos: {},
    verCliente: false,
    verContacto: false
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
    //…
    clickVerModalGuardar: async function() {
      this.VerModalGuardar=true
    },
    clickCerrarModalGuardar: async function() {
      this.VerModalGuardar=false
    },
    clickVerClientes: async function(name) {
      this.txtCliente = name
    },
     clickNoVerClientes: async function () {
       this.txtCliente = ""
     },
     clickVerCliente: async function(cliente) {
       this.clientes=cliente
       this.verCliente= true
     },
     clickVerContacto: async function (contacto) {
       this.contactos = contacto
       this.verCliente = true
     }
    
  },
  computed:{
     filteredContactos: function () {
       return this.contactos.filter((contacto) => {
         return contacto.name.match(this.txtCliente)
       })
     }
  },
  watch:{
    txtCliente() {
      console.log(this.txtCliente)
    }
  }
});
