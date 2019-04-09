module.exports = {


    friendlyName: 'Eliminar un contacto',


    description: '',


    inputs: {
        cedula: {
            type: 'string',
            required: true,
            maxLength: 10,
            unique: true,
            description: 'Cedula del contacto, se deja de 10 campos en caso de ced. jurídica y es para identificar el contacto dentro de la base de datos',
        },
    },


    exits: {
        contactoNoEncontrado: {
            message: "No se encuentra el contacto solicitado",
            responseType: "notFound"
        }

    },


    fn: async function (inputs, exits) {

        try {
            let contacto = await Contactos.find({ cedula: inputs.cedula });

            if (contacto === undefined) {
                return exits.contactoNoEncontrado(`Contacto ${inputs.cedula} no encontrado`);
            }
            else {
                await Contactos.update({ cedula: inputs.cedula }, {activo: false});
                return exits.success();
            }

        } catch (error) {

            return exits.error(error.message);

        }

    }


};
