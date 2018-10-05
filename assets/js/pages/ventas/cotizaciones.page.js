parasails.registerPage('cotizaciones', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    cotizacion: { /* */ },
    verModal: false,
    modBorrarEvento: false,
    modCopiarEvento: false,
    busquedaCotizacion: '',
    filtro: {}
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
      // Método para desplegar el modal y cargar la cotización
      verEvento: async function (cotizacion) {
          this.cotizacion = cotizacion;
          this.verModal = true;
        },

        // Método de cerrar el modal y restablecer la cotizacion local
        cerrarEvento: async function () {
            this.cotizacion = { /* */ };
            this.verModal = false;
          },

          copiarEvento: async function (cotizacion) {
              this.cotizacion = cotizacion;
              this.modCopiarEvento = true;
            },

            confirmarCopiar: async function () {
                this.cancelarCopiar();
              },

              cancelarCopiar: async function () {
                  this.cotizacion = { /*_*/ };
                  this.modCopiarEvento = false;
                },

                borrarEvento: async function (cotizacion) {
                    this.cotizacion = cotizacion;
                    this.modBorrarEvento = true;
                  },

                  confirmarBorrar: async function () {
                      //this.cotizaciones = this.cotizaciones.filter(cotizacion => cotizacion !== this.cotizacion)
                      this.cancelarBorrar();
                    },

                    cancelarBorrar: async function () {
                      this.cotizacion = { /*_*/ };
                      this.modBorrarEvento = false;
                    }
    },
    // Métodos de filtro
    computed: {
      filtroCotizacion: function () {
        // Se verifica que la barra de búsqueda no este vaciá
        if (this.busquedaCotizacion) {
          return this.modelo.cotizaciones.filter(cotizacion => {
            // Verifica que cada atributo del objeto sea igual al atributo del filtro
            for (var key in this.filtro) {
              if (this.filtro[key].length !== 0 && (cotizacion[key] === undefined || !cotizacion[key].includes(this.filtro[key])))
                return false;
            }
            // Verifica que la descripción o la ubicación del evento cumpla con lo escrito en la barra de búsqueda
            return (cotizacion.descripcion.includes(this.busquedaCotizacion) || cotizacion.ubicacion.includes(this.busquedaCotizacion));
          })
        } else {
          return [];
        }
      }
    }
});
