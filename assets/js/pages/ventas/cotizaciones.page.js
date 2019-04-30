parasails.registerPage('cotizaciones', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    o_cotizacion: { /* */ },
    l_verModal: false,
    l_modBorrarEvento: false,
    l_modCopiarEvento: false,
    l_busquedaCotizacion: '',
    l_myId: '',
    l_filtro: {},
     // Datos del form
     formData: {
      /* … */ },
    syncing: false,
    cloudError: '',
    formErrors: {
      /* … */ },
    formRules: {

    },
    l_verModalAyuda: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: async function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    let respCotizaciones = await Cloud.extraerCotizaciones();
    this.modelo.cotizaciones = respCotizaciones;
    console.log(this.modelo.cotizaciones)
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
          this.o_cotizacion = cotizacion;
          if(this.o_cotizacion.fechaEvento !== 0)
          {
            let t_fechaEvento = this.o_cotizacion.fechaEvento;
            t_fechaEvento = new Date(t_fechaEvento);
            this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' + '0'+ (t_fechaEvento.getMonth()+1) + '-' + t_fechaEvento.getDate();
  
            let t_fechaFinEvento = this.o_cotizacion.fechaFinEvento;
            t_fechaFinEvento = new Date(t_fechaFinEvento);
            this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0'+ (t_fechaFinEvento.getMonth()+1) + '-' + t_fechaFinEvento.getDate();
          }
          if(this.o_cotizacion.fechaMontaje !== 0)
          {
            let t_fechaMontaje = this.o_cotizacion.fechaMontaje;
            t_fechaMontaje = new Date(t_fechaMontaje);
            this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0'+ (t_fechaMontaje.getMonth()+1) + '-' + t_fechaMontaje.getDate();
  
            let t_fechaDesmontaje = this.o_cotizacion.fechaDesmontaje;
            t_fechaDesmontaje = new Date(t_fechaDesmontaje);
            this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0'+ (t_fechaDesmontaje.getMonth()+1) + '-' + t_fechaDesmontaje.getDate();
          }

          console.log(this.me.id);
          this.l_verModal = true;
        },

        // Método de cerrar el modal y restablecer la cotizacion local
        cerrarEvento: async function () {
            this.o_cotizacion = { /* */ };
            this.l_verModal = false;
          },

          copiarEvento: async function (cotizacion) {
              this.o_cotizacion = cotizacion;
              this.l_modCopiarEvento = true;
            },

            confirmarCopiar: async function () {
                this.cancelarCopiar();
              },

              cancelarCopiar: async function () {
                  this.o_cotizacion = { /*_*/ };
                  this.l_modCopiarEvento = false;
                },

                borrarEvento: async function (cotizacion) {
                    this.o_cotizacion = cotizacion;
                    this.l_modBorrarEvento = true;
                  },

                  confirmarBorrar: async function () {
                      //this.cotizaciones = this.cotizaciones.filter(cotizacion => cotizacion !== this.cotizacion)
                      this.cancelarBorrar();
                    },

                    cancelarBorrar: async function () {
                      this.o_cotizacion = { /*_*/ };
                      this.l_modBorrarEvento = false;
                    },
      clickVerModalAyuda: async function()
      {
        this.l_verModalAyuda = true;
      },
      clickCerrarModalAyuda: async function()
      {
        this.l_verModalAyuda = false;
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

        if (this.l_busquedaCotizacion.length > 3 ) {
          console.log(limpiaFiltro(this.l_filtro));
          return _.filter(this.modelo.cotizaciones, limpiaFiltro(this.l_filtro))
            .filter(cotizacion =>cotizacion.encargado.fullName.includes(this.l_busquedaCotizacion) ||cotizacion.descripcion.includes(this.l_busquedaCotizacion) || cotizacion.lugarEvento.includes(this.l_busquedaCotizacion));
            }else if(this.l_busquedaCotizacion === "*")
        {
          return this.modelo.cotizaciones;
        } else {
          return new Array();
        }
      }
    }
});
