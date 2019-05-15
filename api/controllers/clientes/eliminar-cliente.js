module.exports = {


    friendlyName: 'Eliminar un cliente',


    description: '',


    inputs: {
        cedula: {
            type: 'string',
            required: true,
            maxLength: 10,
            unique: true,
            description: 'Cedula del cliente, se deja de 10 campos en caso de ced. jurídica y es para identificar el contacto dentro de la base de datos',
        },
    },


    exits: {
        clienteNoEncontrado: {
            message: "No se encuentra el cliente solicitado",
            responseType: "notFound"
        }

    },


    fn: async function (inputs, exits) {

        try {
            let cliente = await Clientes.findOne({ cedula: inputs.cedula });

            if (cliente === undefined) {
                return exits.clienteNoEncontrado(`Cliente ${inputs.cedula} no encontrado`);
            }
            else {
                await Clientes.update({ cedula: inputs.cedula }, {activo: false});
                return exits.success();
            }

        } catch (error) {

            return exits.error(error.message);

        }

    }


};
