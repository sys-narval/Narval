parasails.registerPage('cotizaciones', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    o_cotizacion: {
      /* */
    },
    t_cotizacion:
    {
      lugarEvento: undefined,
      esDiseno: undefined,
      esMontaje: undefined,
      esAlquiler: undefined,
      descripcion: undefined,
      fechaEvento: 0,
      fechaFinEvento: 0,
      fechaMontaje: 0,
      fechaDesmontaje: 0,
      estado:'',
      encargado: undefined,
      cliente: undefined,
      contacto: undefined,
      jsonArticulos: {articulos:undefined}
    },
    l_verModal: false,
    l_modBorrarEvento: false,
    l_modCopiarEvento: false,
    l_busquedaCotizacion: '',
    l_myId: '',
    l_verificaEstado: '',
    l_filtro: {
      cliente: {},
      encargado: {},
      fechaInicioF: "",
      fechaFinF: "",
      misCotizaciones: false
    },
    // Datos del form
    formData: { /* … */},
    syncing: false,
    cloudError: '',
    formErrors: { /* … */},
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
        let t_diasE = 0;
        t_diasE = new Date(t_fechaEvento.getFullYear(), t_fechaEvento.getMonth() +1, 0).getDate();
        //Fecha inicio del evento validaciones  
        if (t_fechaEvento.getDate() + 1 == 32 && t_diasE == 31) { //Si es el primer dia de un mes o un año 
          t_fechaEvento.setDate(01);
          if ((t_fechaEvento.getMonth() + 2) == 13) { //Si es 31 de diciembre lo que llega
            t_fechaEvento.setMonth(1);
              this.o_cotizacion.fechaEvento = (t_fechaEvento.getFullYear() + 1) + '-' + '0' + (t_fechaEvento.getMonth()) + '-' + '0' + (t_fechaEvento.getDate());

          } else {
            if (t_fechaEvento.getMonth() + 1 > 9) { //Si el mes es mayor a setiembre o mayor a 9 
              this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());

            } else {
              this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());
            }
          }
        } else if (t_fechaEvento.getDate() + 1 == 31 && t_diasE == 30) { //Si es el primer dia de un mes 
          t_fechaEvento.setDate(01);
          if (t_fechaEvento.getMonth() + 2 > 9) {
            this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());

          } else {
            this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());
          }
        } else if ((t_fechaEvento.getDate() + 1 == 29 && t_diasE == 28) || (t_fechaEvento.getDate() + 1 == 30 && t_diasE == 29)) { // Si el mes es febrero
          t_fechaEvento.setDate(01);
          if (t_fechaEvento.getMonth() + 1 == 13) {
            t_fechaEvento.setMonth(1);
            this.o_cotizacion.fechaEvento = (t_fechaEvento.getFullYear() + 1) + '-' + '0' + (t_fechaEvento.getMonth()) + '-' + '0' + (t_fechaEvento.getDate());

          } else {
            this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 2) + '-' + '0' + (t_fechaEvento.getDate());
          }


        } else { //Cualquier fecha menos el 1er dia del mes
          if (t_fechaEvento.getMonth() + 1 > 9) {
            if(t_fechaEvento.getDate()+1 > 9)
            {
              this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' +  (t_fechaEvento.getMonth() + 1) + '-' +  (t_fechaEvento.getDate() + 1);

            }else
            {
              this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' +  (t_fechaEvento.getMonth() + 1) + '-' + '0'+(t_fechaEvento.getDate() + 1);
            }

          } else {

            if(t_fechaEvento.getDate()+1 > 9)
            {
              this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 1) + '-' +  (t_fechaEvento.getDate() + 1);
            }else
            {
              this.o_cotizacion.fechaEvento = t_fechaEvento.getFullYear() + '-' + '0' + (t_fechaEvento.getMonth() + 1) + '-' + '0' + (t_fechaEvento.getDate() + 1);
            }

          }
        }

        //FEcha del Fin del Evento
        let t_fechaFinEvento = this.o_cotizacion.fechaFinEvento;
        t_fechaFinEvento = new Date(t_fechaFinEvento);
        let t_dias = 0;
        t_dias = new Date(t_fechaFinEvento.getFullYear(), t_fechaFinEvento.getMonth() + 1, 0).getDate();
        console.log(t_fechaFinEvento.getMonth() + 1);
        console.log(new Date(t_fechaFinEvento.getFullYear(), t_fechaFinEvento.getMonth() + 1, 0).getDate());
        //Fecha fin del evento validaciones  
        if (t_fechaFinEvento.getDate() + 1 == 32 && t_dias == 31) { //Si es el primer dia de un mes o un año 
          t_fechaFinEvento.setDate(01); 
          if ((t_fechaFinEvento.getMonth() + 2) == 13) { //Si es diciembre
            t_fechaFinEvento.setMonth(1);
              this.o_cotizacion.fechaFinEvento = (t_fechaFinEvento.getFullYear() + 1) + '-' + '0' + (t_fechaFinEvento.getMonth()) + '-' + '0' + (t_fechaFinEvento.getDate());

          } else { // Si no es diciembre
            if (t_fechaFinEvento.getMonth() + 1 > 9) {
              this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());

            } else {
              this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());
            }
          }

        } else if (t_fechaFinEvento.getDate() + 1 == 31 && t_dias == 30) { //Primer dia de  un mes
          t_fechaFinEvento.setDate(01);
          if (t_fechaFinEvento.getMonth() + 2 > 9) {
            this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());

          } else {

            this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());

          }

        } else if ((t_fechaFinEvento.getDate() + 1 == 29 && t_dias == 28) || (t_fechaFinEvento.getDate() + 1 == 30 && t_dias == 29)) { //Si es febrero
          t_fechaFinEvento.setDate(01);
          this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 2) + '-' + '0' + (t_fechaFinEvento.getDate());


        } else {
          if (t_fechaFinEvento.getMonth() + 1 > 9) {
            if(t_fechaFinEvento.getDate()+1 > 9)
            {
              this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + (t_fechaFinEvento.getMonth() + 1) + '-' + (t_fechaFinEvento.getDate() + 1);
            }else
            {
              this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + (t_fechaFinEvento.getMonth() + 1) + '-' + '0'+(t_fechaFinEvento.getDate() + 1);
            }

          } else {
            if(t_fechaFinEvento.getDate()+1 > 9)
            {
              this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 1) + '-' +  (t_fechaFinEvento.getDate() + 1);
            }else
            {
             
              this.o_cotizacion.fechaFinEvento = t_fechaFinEvento.getFullYear() + '-' + '0' + (t_fechaFinEvento.getMonth() + 1) + '-' + '0' + (t_fechaFinEvento.getDate() + 1);
            }

          }

        }

      }
      //Fecha Montaje
      if (this.o_cotizacion.fechaMontaje !== 0) {
        let t_fechaMontaje = this.o_cotizacion.fechaMontaje;
        t_fechaMontaje = new Date(t_fechaMontaje);
        let t_diasM = 0;
        t_diasM = new Date(t_fechaMontaje.getFullYear(), t_fechaMontaje.getMonth() + 1, 0).getDate();
        //Fecha iniicio del montaje validaciones  
        if (t_fechaMontaje.getDate() + 1 == 32 && t_diasM == 31) { // Si es el primer dia de un mes o un año
          t_fechaMontaje.setDate(01);
          if (t_fechaMontaje.getMonth() + 2 == 13) { //Si es diciembre
            t_fechaMontaje.setMonth(1);
              this.o_cotizacion.fechaMontaje = (t_fechaMontaje.getFullYear() + 1) + '-' + '0' + (t_fechaMontaje.getMonth()) + '-' + '0' + (t_fechaMontaje.getDate());
          } else {
            if (t_fechaMontaje.getMonth() + 1 > 9) {
              this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());
            } else {
              this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());
            }
          }
        } else if (t_fechaMontaje.getDate() + 1 == 31 && t_diasM == 30) { //Primer dia de un mes
          t_fechaMontaje.setDate(01);
          if (t_fechaMontaje.getMonth() + 2 > 9) {

            this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());

          } else {
            this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());
          }

        } else if ((t_fechaMontaje.getDate() + 1 == 29 && t_diasM == 28) || (t_fechaMontaje.getDate() + 1 == 30 && t_diasM == 29)) { //Si es febrero
          t_fechaMontaje.setDate(01);
          this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 2) + '-' + '0' + (t_fechaMontaje.getDate());

        } else {
          if (t_fechaMontaje.getMonth() + 1 > 9) {
            if(t_fechaMontaje.getDate() + 1 > 9)
            {
              this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + (t_fechaMontaje.getMonth() + 1) + '-' + (t_fechaMontaje.getDate() + 1);
            }else
            {
              this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + (t_fechaMontaje.getMonth() + 1) + '-' + '0' + (t_fechaMontaje.getDate() + 1);
            }

          } else {
            if(t_fechaMontaje.getDate() + 1 > 9)
            {
              this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 1) + '-' +(t_fechaMontaje.getDate() + 1);
            }else
            {
              
              this.o_cotizacion.fechaMontaje = t_fechaMontaje.getFullYear() + '-' + '0' + (t_fechaMontaje.getMonth() + 1) + '-' +'0'+(t_fechaMontaje.getDate() + 1);
            }

          }
        }
        //FEcha DEsmontaje
        let t_fechaDesmontaje = this.o_cotizacion.fechaDesmontaje;
        t_fechaDesmontaje = new Date(t_fechaDesmontaje);
        let t_diasD = 0;
        t_diasD = new Date(t_fechaDesmontaje.getFullYear(), t_fechaDesmontaje.getMonth() + 1, 0).getDate();
        //Fecha fin del montaje validaciones  
        if (t_fechaDesmontaje.getDate() + 1 == 32 && t_diasD == 31) { //Si es el primer dia de un mes o un año
          t_fechaDesmontaje.setDate(01);
          if (t_fechaDesmontaje.getMonth() + 2 == 13) { // Si es diciembre
            t_fechaDesmontaje.setMonth(1);
              this.o_cotizacion.fechaDesmontaje = (t_fechaDesmontaje.getFullYear() + 1) + '-' + '0' + (t_fechaDesmontaje.getMonth()) + '-' + '0' + (t_fechaDesmontaje.getDate());

          } else {
            if (t_fechaDesmontaje.getMonth() + 1 > 9) {
              this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());

            } else {
              this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());
            }
          }
        } else if (t_fechaDesmontaje.getDate() + 1 == 31 && t_diasD == 30) { //Primer dia de un mes
          t_fechaDesmontaje.setDate(01);
          if (t_fechaDesmontaje.getMonth() + 2 > 9) {
            this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());

          } else {

            this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());

          }
        } else if ((t_fechaDesmontaje.getDate() + 1 == 29 && t_diasD == 28) || (t_fechaDesmontaje.getDate() + 1 == 30 && t_diasD == 29)) { //Si es febrero
          t_fechaDesmontaje.setDate(01);
          this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 2) + '-' + '0' + (t_fechaDesmontaje.getDate());

        } else {
          if (t_fechaDesmontaje.getMonth() + 1 > 9) {
            if(t_fechaDesmontaje.getDate() + 1 > 9)
            {
              this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + (t_fechaDesmontaje.getMonth() + 1) + '-' + (t_fechaDesmontaje.getDate() + 1);
            }else
            {
              this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + (t_fechaDesmontaje.getMonth() + 1) + '-' +'0'+ (t_fechaDesmontaje.getDate() + 1);
            }

          } else {
            if(t_fechaDesmontaje.getDate() + 1 > 9)
            {
              this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 1) + '-' + (t_fechaDesmontaje.getDate() + 1);
            }else
            {
              
              this.o_cotizacion.fechaDesmontaje = t_fechaDesmontaje.getFullYear() + '-' + '0' + (t_fechaDesmontaje.getMonth() + 1) + '-'+'0' +(t_fechaDesmontaje.getDate() + 1);
            }

          }

        }
      }


      this.l_verModal = true;
    },


    // Método de cerrar el modal y restablecer la cotizacion local
    cerrarEvento: async function () {
      this.o_cotizacion = {
        /* */
      };
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
      this.o_cotizacion = {
        /*_*/
      };
      this.l_modCopiarEvento = false;
    },

    cambioEstado: async function (p_cotizacion) {
      //this.o_cotizacion = p_cotizacion;
      this.t_cotizacion.id = p_cotizacion.id;
      this.t_cotizacion.encargado = p_cotizacion.encargado.id;
      this.t_cotizacion.lugarEvento = p_cotizacion.lugarEvento;
      this.t_cotizacion.descripcion = p_cotizacion.descripcion;
      this.t_cotizacion.esDiseno = p_cotizacion.esDiseno;
      this.t_cotizacion.esMontaje= p_cotizacion.esMontaje;
      this.t_cotizacion.esAlquiler = p_cotizacion.esAlquiler;
      let l_prueba = [];
     // this.t_cotizacion.jsonArticulos = [];
     if(p_cotizacion.articulos.length != 0)
     {
       for(let index = 0; index < p_cotizacion.articulos.length; index++){
        l_prueba.push({ id: p_cotizacion.articulos[index].id, cantidad: p_cotizacion.articulos[index].cantidad, precio: p_cotizacion.articulos[index].precioTotal });
  
       }

     }
     this.t_cotizacion.jsonArticulos.articulos = l_prueba;
      this.t_cotizacion.cliente = p_cotizacion.cliente.id;
      this.t_cotizacion.contacto = p_cotizacion.contacto.id;
      this.t_cotizacion.fechaEvento = p_cotizacion.fechaFinEvento;
      this.t_cotizacion.fechaFinEvento = p_cotizacion.fechaFinEvento;
      this.t_cotizacion.fechaMontaje = p_cotizacion.fechaFinEvento;
      this.t_cotizacion.fechaDesmontaje = p_cotizacion.fechaFinEvento;
      this.t_cotizacion.estado = p_cotizacion.estado;
     this.l_verificaEstado = p_cotizacion.estado;
      
      this.l_modBorrarEvento = true;
    },

    confirmarEvento: async function () {
      /*let error = '';
      if(this.t_cotizacion.estado == "Activo")
      {
         await Cloud.reservarUnaCotazacion(this.t_cotizacion.id);
      }*/
      location.href = "cotizaciones";
      
     console.log(this.t_cotizacion.estado);
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
      this.o_cotizacion = {
        /*_*/
      };
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
    diasDelMes: function (anno, mes) {
      let dias = 0;
      dias = new Date(anno, mes, 0).getDate();

      return dias;

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
          if (objeto[atributo] === null || objeto[atributo] === undefined || objeto[atributo] === '' || objeto[atributo] === false) {
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
        for (let index = 0; index < this.modelo.cotizaciones.length; index++) { //for que recorre todo el modelo de las cotizaciones

          if (typeof (this.modelo.cotizaciones[index].fechaEvento) !== "number") {
            let t_f = new Date(this.modelo.cotizaciones[index].fechaEvento);
            t_f = Date.parse(t_f);

            if (t_inicio <= t_f && t_f <= t_fin) { //Si la fecha de inicio es menor a la fecha del evento de la cotizacion del modelo
              t_cotizaciones.push(this.modelo.cotizaciones[index]);
            }
          } else {
            if (t_inicio <= this.modelo.cotizaciones[index].fechaEvento && this.modelo.cotizaciones[index].fechaEvento <= t_fin) { //Si la fecha de inicio es menor a la fecha del evento de la cotizacion del modelo
              t_cotizaciones.push(this.modelo.cotizaciones[index]);
            }
          }
        }
        return t_cotizaciones;

      } else if (this.l_filtro.misCotizaciones === true && this.l_busquedaCotizacion === "*") {
        let t_cotizaciones = [];
        for (let index = 0; index < this.modelo.cotizaciones.length; index++) {
          if (this.me.id === this.modelo.cotizaciones[index].encargado.id) {
            t_cotizaciones.push(this.modelo.cotizaciones[index]);
          }
        }
        return t_cotizaciones;

      } else {
        return new Array();
      }
    }
  },
});
