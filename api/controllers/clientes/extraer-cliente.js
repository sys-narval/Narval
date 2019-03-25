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

  },


  fn: async function (inputs) {

    let cliente = await ClientRectList.findOne({
      nombre: inputs.nombre
    }).populate('contactos');

    return cliente;

  }


};
