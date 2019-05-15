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
    l_filtro: {
      cliente: {},
      encargado: {},
      fechaInicioF: "",
      fechaFinF: "",
      misCotizaciones: false
    },
    // Datos del form
    formData: {
      /* … */
    },
    syncing: false,
    cloudError: '',
    formErrors: {
      /* … */
    },
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
      if (this.o_cotizacion.fechaEvento !== 0) {
        let t_fechaEvento = this.o_cotizacion.fechaEvento;
        t_fechaEvento = new Date(t_fechaEvento);
        this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 1) + '-' + (t_fechaEvento.getDate() + 1);

        let t_fechaFinEvento = this.o_cotizacion.fechaFinEvento;
        t_fechaFinEvento = new Date(t_fechaFinEvento);
        this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 1) + '-' + (t_fechaFinEvento.getDate() + 1);
      }
      if (this.o_cotizacion.fechaMontaje !== 0) {
        let t_fechaMontaje = this.o_cotizacion.fechaMontaje;
        t_fechaMontaje = new Date(t_fechaMontaje);
        this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 1) + '-' + (t_fechaMontaje.getDate() + 1);

        let t_fechaDesmontaje = this.o_cotizacion.fechaDesmontaje;
        t_fechaDesmontaje = new Date(t_fechaDesmontaje);
        this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 1) + '-' + (t_fechaDesmontaje.getDate() + 1);
      }


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

    cambioEstado: async function (cotizacion) {
      this.o_cotizacion = cotizacion;
      this.l_modBorrarEvento = true;
    },

    confirmarEvento: async function () {
      //this.cotizaciones = this.cotizaciones.filter(cotizacion => cotizacion !== this.cotizacion)
      this.o_cotizacion.estado = 'Activo';
      //  await Cloud.actualizarCotizacion(this.o_cotizacion);
      this.l_modBorrarEvento = false;
    },
    pendienteEvento: async function () {
      this.o_cotizacion.estado = 'Pendiente';
      this.l_modBorrarEvento = false;
    },
    canceladoEvento: async function () {
      this.o_cotizacion.estado = 'Cancelado';
      this.l_modBorrarEvento = false;
    },
    terminadoEvento: async function () {
      this.o_cotizacion.estado = 'Finalizado';
      this.l_modBorrarEvento = false;
    },

    cancelarEstado: async function () {
      this.o_cotizacion = { /*_*/ };
      this.l_modBorrarEvento = false;
    },
    clickVerModalAyuda: async function () {
      this.l_verModalAyuda = true;
    },
    clickCerrarModalAyuda: async function () {
      this.l_verModalAyuda = false;
    },
    pasarVariable: async function (idCotizacion) {
      location.href = "ventas?variable=" + idCotizacion + "";
    },
    btnActualizarCotizacion: async function (o_cotizacion) {
      location.href = "actualizarCotizacion?variable=" + o_cotizacion.id + "";
    },
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
        for (let atributo in objeto) {
         if (objeto[atributo] === null || objeto[atributo] === undefined || objeto[atributo] === '' || objeto[atributo] === false)
         {
           delete objeto[atributo];
         }
            

            
        }
        

        
        return objeto;
      }


      /*
      * Filtramos las cotizaciones que cumplan con el filtro preestablecido por el usuario y que cumpla con
      * que la barra de búsqueda tenga más de un dígito y coincida con la descripción o ubicación.
      */

      if (this.l_busquedaCotizacion.length > 3) {
        if (this.l_filtro.cliente.nombre === '') {
          this.l_filtro.cliente = {};
        }
        if (this.l_filtro.encargado.fullName === '') {
          this.l_filtro.encargado = {};
        }
        return _.filter(this.modelo.cotizaciones, limpiaFiltro(this.l_filtro))
          .filter(cotizacion => cotizacion.encargado.fullName.includes(this.l_busquedaCotizacion) || cotizacion.descripcion.includes(this.l_busquedaCotizacion) || cotizacion.lugarEvento.includes(this.l_busquedaCotizacion));
      } else if (this.l_busquedaCotizacion === "*" && (this.l_filtro.misCotizaciones === false || this.l_filtro.misCotizaciones === undefined)) {
        return this.modelo.cotizaciones;
      } else if (this.l_busquedaCotizacion == "/") {
        let t_inicio = 0;
        t_inicio = Date.parse(this.l_filtro.fechaInicioF); // fecha recopilada del filtro
        let t_fin = 0;
        t_fin = Date.parse(this.l_filtro.fechaFinF); // fecha recopilada del filtro
        let t_cotizaciones = [];
        for (let index = 0; index <this.modelo.cotizaciones.length; index++) { //for que recorre todo el modelo de las cotizaciones
          console.log("----------------")
          console.log(index)
          console.log( t_inicio <= this.modelo.cotizaciones[index].fechaEvento);
          console.log(t_fin >= this.modelo.cotizaciones[index].fechaEvento);
          console.log("---------------");
         /* if(index == 5)
          {
            console.log(this.modelo.cotizaciones[index].fechaEvento);
            console.log(new Date(this.modelo.cotizaciones[index].fechaEvento));
            console.log(new Date(t_inicio));
            console.log(this.modelo.cotizaciones[index]);
          }*/
          if(typeof(this.modelo.cotizaciones[index].fechaEvento) !== "number")
          {
            let t_f = new Date(this.modelo.cotizaciones[index].fechaEvento);
            t_f = Date.parse(t_f);
            //this.modelo.cotizaciones[index].fechaEvento = t_f;
            if (t_inicio <= t_f && t_f <= t_fin) { //Si la fecha de inicio es menor a la fecha del evento de la cotizacion del modelo
              t_cotizaciones.push(this.modelo.cotizaciones[index]);
            }
          }else
          {
            if (t_inicio <= this.modelo.cotizaciones[index].fechaEvento && this.modelo.cotizaciones[index].fechaEvento <= t_fin) { //Si la fecha de inicio es menor a la fecha del evento de la cotizacion del modelo
              t_cotizaciones.push(this.modelo.cotizaciones[index]);
            }
          }
        }
        return t_cotizaciones;
       
      }else if(this.l_filtro.misCotizaciones === true && this.l_busquedaCotizacion === "*")
      {
        let t_cotizaciones = [];
        for(let index = 0; index < this.modelo.cotizaciones.length; index++)
        {
          if(this.me.id === this.modelo.cotizaciones[index].encargado.id)
          {
              t_cotizaciones.push(this.modelo.cotizaciones[index]);
          }
        }
        return t_cotizaciones;

      }else {
        return new Array();
      }
    }
  },
});
