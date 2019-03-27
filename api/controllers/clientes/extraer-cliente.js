module.exports = {


  friendlyName: 'Extraer cliente',


  description: 'Acción para obtener un cliente de la BD en base a su nombre',


  inputs: {
    nombre: {
      type: "string",
      maxLength: 20,
      required: true,
      unique: true,
      description: "Nombre del cliente"
    }
  },


  exits: {
    clienteNoEncontrado: {
      message: "No se encuentra el cliente solicitado",
      responseType: "notFound"
    }
  },


  fn: async function (inputs, exits) {

    let cliente = await Clientes.findOne({ nombre: inputs.nombre }).populate("contactos");

    return cliente ? cliente : exits.clienteNoEncontrado(`Cliente ${inputs.nombre} no encontrado`)

  }


};
