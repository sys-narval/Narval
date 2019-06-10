parasails.registerPage('inventario', {


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
    l_verModalActualizar: false,
    l_verModalAgregar: false,
    l_verModalEliminar: false,
    l_verModalAyuda: false,
    l_actualizar: false,
    l_buscarArticulo: '',
    l_filtro: {},
    l_masDanado: 0,
    l_masArticulos: 0,
    l_menosDannado: 0,
    l_cantidadTotalG: 0,
    l_cantidadTotalD: 0,


    formData: {
      /* … */ },
    syncing: false,
    cloudError: '',
    formErrors: {
      /* … */ },
    formRules: {
      id: {
        required: true
      },
      descripcion: {
        required: true
      },
      cantidadTotal: {
        required: true
      },
      precio: {
        required: true
      },
      categoria: {
        required: true
      },
      unidadMedida: {
        required: true
      },

    }, //Reglas para las validaciones
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: async function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    let respArticulos = await Cloud.extraerInventario();

    this.modelo.articulos = respArticulos.articulos;
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    guardar: async function (tableID, filename = '') {
      var downloadLink;
      var dataType = 'application/vnd.ms-excel';
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

      // Specify file name
      filename = filename ? filename + '.xls' : 'excel_data.xls';

      // Create download link element
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['ufeff', tableHTML], {
          type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }


    },
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
    cerrarModalActualizar: async function () {
      this.l_verModalActualizar = false;
      this.limpiar_o_articulo();
      this.formErrors = {};
      this.l_actualizar = false;
      this.l_cantidadTotalG = 0;
      this.l_cantidadTotalD = 0;
    }, //Método que cierra el modal de actualizar
    cerrarModalEliminar: async function () {
      this.l_verModalEliminar = false;
      this.limpiar_o_articulo();
      this.l_actualizar = false;
    }, //Método que cierra el modal de Eliminar
    cerrarNuevo: async function () {
      this.l_verModalAgregar = false;
      this.limpiar_o_articulo();
      this.formErrors = {};
      this.l_actualizar = false;
    }, //Método que cierra el modal de Agregar Articulo
    cerrarModalAyuda: async function () {
      this.l_verModalAyuda = false;
    },
    verModalAyuda: async function () {
      this.l_verModalAyuda = true;
    },
    verModalActualizar: async function (p_articulo) {
      Object.assign(this.o_articulo, p_articulo);
      this.l_verModalActualizar = true;
      this.l_masArticulos = 0;
      this.l_masDanado = 0;
      this.l_menosDannado = 0;
      this.l_cantidadTotalG = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadLibre;
      this.l_cantidadTotalD = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadDanado;
    }, //Método que abre el modal Actualizar 
    verModalAgregar: async function () {
      this.l_verModalAgregar = true;
    }, //Método que abre el modal Agregar
    verModalEliminar: async function (p_articulo) {
      this.o_articulo = p_articulo;
      this.l_verModalEliminar = true;
    }, //Método que abre el modal Eliminar
    crearArticulo: async function (p_articuloNuevo) {
      this.o_articulo.cantidadTotal = parseInt(this.o_articulo.cantidadTotal);
      this.o_articulo.cantidadLibre = parseInt(this.o_articulo.cantidadTotal);
      this.o_articulo.precio = parseInt(this.o_articulo.precio);
      this.o_articulo.cantidadDanado = 0;
      this.o_articulo.cantidadUso = 0;
      this.o_articulo.cantidadReservado = 0;
      this.o_articulo.activo = true;
      // En caso de categoría electronica
      if (this.o_articulo.categoria === 'Electrónico') {
        this.o_articulo.serialesBuenos = this.o_articulo.serialesTotal;
      }
      this.p_articuloNuevo = {};
      this.modelo.articulos.push(this.o_articulo);
      this.l_actualizar = true;
      this.cerrarNuevo();
      this.$forceUpdate();
      alert('Artículo ingresado correctamente!');
    }, //Método que crea un articulo, primero analizar los valores enteros y después lo mete en un arreglo
    eliminarUnArticulo: async function () {
      await Cloud.eliminarUnArticulo.with(this.o_articulo);
      this.modelo.articulos = this.modelo.articulos.map(articulo => {
        if (articulo.id === this.o_articulo.id) {
          articulo.activo = false;
        }
        return articulo;
      });
      this.l_actualizar = true;
      this.cerrarModalEliminar();
      this.$forceUpdate();
    }, //Método que elimina un articulo de la base de datos local y despues lo elimina del arreglo
    activarArticulo: async function (p_articulo) {
      p_articulo.activo = true;
      await Cloud.actualizarUnArticulo.with(p_articulo);
      this.actualizarUnArticulo(p_articulo);
    },
    actualizarUnArticulo: async function (p_articulo) {
      this.o_articulo.precio = parseInt(this.o_articulo.precio);
      this.modelo.articulos = this.modelo.articulos.map(articulo => {
        if (articulo.id === this.o_articulo.id) {
          articulo = this.o_articulo;
        }
        return articulo;
      });
      this.l_actualizar = true;
      this.cerrarModalActualizar();
      this.$forceUpdate();
    }, //Método que actualiza un objeto de la base de datos local
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
  }, //Método que permite darle formato a la moneda del precio del articulo
  computed: {
    filtroCategorias: function () {
      let l_bandera = false;
      let a_arregloCategoria = [];
      this.filtroArticulos.forEach(element => {
        if (a_arregloCategoria.length === 0) {
          a_arregloCategoria.push(element.categoria);
        } else {
          for (let index = 0; index < a_arregloCategoria.length; index++) {
            if (a_arregloCategoria[index] === element.categoria) {
              l_bandera = true;
              index = a_arregloCategoria.length + 1;
            }
          }
          if (l_bandera === false) {
            a_arregloCategoria.push(element.categoria);
          }
          l_bandera = false;
        }
      });
      return a_arregloCategoria;
    }, //Método para filtrar por categorías
    filtroArticulos: function () {
      /*
       * Función para limpiar el filtro a usar, en caso de que el atributo este vacío
       * eliminamos ese atributo del objeto para que no sea evaluado
       */
      const c_limpiaFiltro = objeto => {
        for (let t_atributo in objeto)
          if (objeto[t_atributo] === null || objeto[t_atributo] === undefined || objeto[t_atributo] === '')
            delete objeto[t_atributo];
        return objeto;
      }

      /*
       * Filtramos las articulos que cumplan con el filtro preestablecido por el usuario y que cumpla con
       * que la barra de búsqueda tenga más de un dígito y coincida con la descripción o ubicación.
       */
      if (this.l_buscarArticulo.length >= 3 && this.l_actualizar === false) {
        return _.filter(this.modelo.articulos, c_limpiaFiltro(this.l_filtro))
          .filter(articulo => articulo.descripcion.toUpperCase().match(this.l_buscarArticulo.toUpperCase()) || articulo.categoria.includes(this.l_buscarArticulo) || articulo.id.includes(this.l_buscarArticulo));
      } else if (this.l_buscarArticulo === "*" && this.l_actualizar === false) {
        return this.modelo.articulos;
      } else {
        return new Array();
      }
    }
  },
  watch: {
    l_masDanado(valNew, valOld) {
      // Esta variable recibe el filtro del articulo del modelo que es 
      // igual a el que se utiliza en cada actualizar
      let l_cantidadLibre = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadLibre;
      /* esta variable recibe la cantidad danado del articulo del modelo que 
      es igual aal que utiliza en cada actualizar*/
      let l_cantidadDanado = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadDanado;
      /* Esta variable transforma el valor del input de el modal actualizar*/
      let l_numMasDanado = parseInt(this.l_masDanado);

      if (this.l_masDanado && l_numMasDanado <= l_cantidadLibre) {
        this.o_articulo.cantidadLibre = l_cantidadLibre - l_numMasDanado + parseInt(this.l_masArticulos);
        this.o_articulo.cantidadDanado = l_numMasDanado + l_cantidadDanado;
      } else {
        this.o_articulo.cantidadLibre = l_cantidadLibre;
        this.o_articulo.cantidadDanado = l_cantidadDanado;
      }
    },
    l_menosDannado(valNew, valOld) {
      // Esta variable recibe el filtro del articulo del modelo que es 
      // igual a el que se utiliza en cada actualizar
      let l_cantidadLibre = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadLibre;
      /* esta variable recibe la cantidad danado del articulo del modelo que 
      es igual aal que utiliza en cada actualizar*/
      let l_cantidadDanado = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadDanado;
      /* Esta variable parsea el valor del input de el modal actualizar*/
      let l_numMenosDanado = parseInt(this.l_menosDannado);

      if (this.l_menosDannado && l_numMenosDanado <= l_cantidadDanado) {
        this.o_articulo.cantidadLibre = l_cantidadLibre + l_numMenosDanado;
        this.o_articulo.cantidadDanado = l_cantidadDanado - l_numMenosDanado;
      } else {
        this.o_articulo.cantidadLibre = l_cantidadLibre;
        this.o_articulo.cantidadDanado = l_cantidadDanado;
      }

    },
    l_masArticulos() {
      /* Esta variable recibe el filtro del articulo del modelo que es 
      igual a el que se utiliza en cada actualizar*/
      let l_cantidadTotal = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadTotal;
      /* Esta variable recibe el filtro del articulo del modelo que es 
              igual a el que se utiliza en cada actualizar*/
      let l_cantidadLibre = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadLibre;
      /* esta variable recibe la cantidad dañado del articulo del modelo que 
      es igual aal que utiliza en cada actualizar*/
      let l_cantidadDanado = _.find(this.modelo.articulos, {
        id: this.o_articulo.id
      }).cantidadDanado;
      /* Esta variable parsea el valor del input de el modal actualizar*/
      let l_numMasArticulos = parseInt(this.l_masArticulos)
      // Métodos if que verifica los datos numéricos de las variables de cantidad
      if (this.l_masArticulos) {
        this.o_articulo.cantidadTotal = l_cantidadTotal + l_numMasArticulos;
        this.o_articulo.cantidadLibre = l_numMasArticulos + l_cantidadTotal - parseInt(this.l_masDanado) - l_cantidadDanado;
      } else {
        this.o_articulo.cantidadTotal = l_cantidadTotal;
        this.o_articulo.cantidadLibre = l_cantidadLibre;
      }
    }

  }

});
