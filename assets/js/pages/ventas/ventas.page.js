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
    l_verModalVer:false,
    txtCliente:'',
    txtEmpresa:'',
    clientes: [{name:''}],
    contactos: [{name:''}],
    articulo: {},
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
     clickVerContacto: async function (vcontacto) {
       this.contactos = vcontacto
       this.verCliente = true
     },
    verArticulo: async function(vArticulo) {
       this.o_articulo = vArticulo
       this.l_verModalVer=true
     },
     cerrarModalVer: async function () {
       this.l_verModalVer=false
       this.limpiar_o_articulo();
     }
    
  },
  computed:{
     filteredContactos: function () {
       return this.contactos.filter((contacto) => {
         return contacto.name.match(this.txtCliente)
       })
     },
     filteredClientes: function () {
       return this.clientes.filter((cliente) => {
         return cliente.name.match(this.txtEmpresa)
       })
     }
  },
  watch:{
    txtCliente() {
      console.log(this.txtCliente)
    }
  }
});
