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

        /*
        * Función para limpiar el filtro a usar, en caso de que el atributo este vacío
        * eliminamos ese atributo del objeto para que no sea evaluado
        */
        const limpiaFiltro = objeto => {
          for (let atributo in objeto)
            if (objeto[atributo] === null || objeto[atributo] === undefined || objeto[atributo] === '')
              delete objeto[atributo];
          return objeto;
        }

        /*
        * Filtramos las cotizaciones que cumplan con el filtro preestablecido por el usuario y que cumpla con
        * que la barra de búsqueda tenga más de un dígito y coincida con la descripción o ubicación.
        */
        if (this.busquedaCotizacion) {
          return _.filter(this.modelo.cotizaciones, limpiaFiltro(this.filtro))
            .filter(cotizacion => cotizacion.descripcion.includes(this.busquedaCotizacion) || cotizacion.ubicacion.includes(this.busquedaCotizacion));
        } else {
          return new Array();
        }
      }
    }
});
