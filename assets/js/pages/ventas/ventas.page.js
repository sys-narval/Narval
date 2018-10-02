parasails.registerPage('ventas', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    VerModalGuardar: false,
    verInfoCliente: '',
    txtCliente:'',
     Clientes: [{
         name: 'Jose arturo',
         telefono: '89792734',
         correo: 'jose17971@outlook.es'
       },
       {
         name: 'Jose antonio',
         telefono: '89792734',
         correo: 'jose17971@outlook.es'
       },
       {
         name: 'Mario',
         telefono: '8888888',
         correo: 'mario123@gmailcom'
       },
     ],
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
    clickVerclientes: async function(name) {
      this.txtCliente = name
    },
     clickNoVerclientes: async function () {
       this.txtCliente = ""
     },
    
  },
  computed:{
     filteredClientes: function () {
       return this.Clientes.filter((cliente) => {
         return cliente.name.match(this.txtCliente)
       })
     }
  },
  watch:{
    txtCliente() {
      console.log(this.txtCliente)
    }
  }
});
