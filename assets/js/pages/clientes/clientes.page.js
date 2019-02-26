parasails.registerPage('clientes', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…

    contactos: [{
      empresa: 'Coca-Cola',
      telefonoEmpresarial: 25555555,
      correoEmpresarial: 'coca@gmail.com',
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
    clickVerEmpresa: async function(info){
      this.informacion=info
    },
  }
});
