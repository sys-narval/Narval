module.exports = {


  friendlyName: 'Extraer cliente',


  description: 'Acción para obtener un cliente de la BD en base a su nombre',


  inputs: {
    cedula: {
      type: "string",
      maxLength: 10,
      required: true,
      unique: true,
      description: "Cedula del cliente, se deja de 10 campos en caso de ced. jurídica"
    }
  },


  exits: {
    clienteNoEncontrado: {
      message: "No se encuentra el cliente solicitado",
      responseType: "notFound"
    }
  },


  fn: async function (inputs, exits) {

    try {

      let cliente = await Clientes.findOne({ cedula: inputs.cedula }).populate("contactos");

      if (cliente === undefined) {
        return exits.clienteNoEncontrado(`Cliente ${inputs.cedula} no encontrado`);
      }
      else {
        return exits.success(cliente);
      }

    } catch (error) {

      return exits.error(error.message);

    }
  }
};
