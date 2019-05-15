module.exports = {


  friendlyName: 'View ventas',


  description: 'Display "Ventas" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/ventas/ventas'
    }

  },


  fn: async function (inputs, exits) {

    let modelo = {
      msg: 1,
      txtCliente: '',
      txtEmpresa: '',
      txtArticulo: '',
      verClientes: false,
      verArticulos: false,
      verEmpresa: false,
      
      v_NArticulos:[{}],
     
      a_categorias: ['Truss', 'Cables', 'Mobiliario', 'Herramientas/Otros', 'Cortinaje', 'Tarimas', 'Electrónico'], //Arreglo con las categorías de los artículos
      a_tipos: ['Luces', 'Audio', 'Video'], // Arreglo con los tipos de artículos electrónicos
      a_unidadMedida: ['Metros', 'Unidades','Centímetros','Pulgadas'], //Arreglo con las unidades de medida
      l_errorNombre : "El nombre es necesario",
      l_errorTelefono: "El número de teléfono debe contener al menos 9 dígitos",
      l_errorCorreo: "El correo electrónico es necesario",
      l_errorCliente: "El cliente es necesario",
      l_errorContacto: "El contacto es necesario"
    };

   /* modelo.articulos = await Articulos.find();
    modelo.clientes = await Clientes.find();
    modelo.contactos = await Contactos.find();*/
    // Respond with view.
    return exits.success({
      modelo
    });

  }


};
