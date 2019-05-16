module.exports = {


    friendlyName: 'Actualizar cotización',


    description: '',


    inputs: {
        id: {
            type: 'string',
            required: true,
            unique: true,
            description: 'ID único  para identificar la cotización dentro de la base de datos',
        },

        lugarEvento: {
            type: "string",
            maxLength: 200,
            description: "Lugar donde se desarrollará el evento"
        },

        esDiseno: {
            type: "boolean",
            default: false,
            description: "Se requiere o no el diseño"
        },

        esMontaje: {
            type: "boolean",
            default: false,
            description: "Se requiere o no el montaje"
        },

        esAlquiler: {
            type: "boolean",
            default: false,
            description: "Se requiere o no el alquiler"
        },

        descripcion: {
            type: "string",
            maxLength: 200,
            description: "Descripción de los servicios "
        },

        fechaEvento: {
            type: "number",
            description: "Fecha en la que inicia el evento"
        },

        fechaFinEvento: {
            type: "number",
            description: "Fecha del final del evento"
        },

        fechaMontaje: {
            type: "number",
            description: "Fecha del montaje del evento"
        },

        fechaDesmontaje: {
            type: "number",
            description: "Fecha del desmontaje del evento"
        },

        estado: {
            type: "string",
            isIn: ["Activo", "Cancelado", "Pendiente", "Finalizado"],
            defaultsTo: "Pendiente",
            description: "Estado actual de la cotización, unicamente permitidos los mencionados anteriormente"
        },

        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
        encargado: {
            type: "number",
            required: true,
            description: "ID del encargado del evento"
        },

        cliente: {
            type: "number",
            required: true,
            description: "ID del cliente del evento"
        },

        contacto: {
            type: "number",
            required: true,
            description: "ID del contacto del evento"
        },

        jsonArticulos: {
            type: "json"
        }

    },


    exits: {
        cotizacionNoEncontrado: {
            message: "No se encuentra la cotización solicitada",
            responseType: "notFound"
        }
    },


    fn: async function (inputs, exits) {
        try {

            let contizacion = await Cotizaciones.findOne({ id: inputs.id })
                .populate("encargado")
                .populate("cliente")
                .populate("contacto")

            if (contizacion === undefined) {
                return exits.cotizacionNoEncontrado(`Cotización ${inputs.id} no encontrado`);
            } else {


                /**
                 * Verificación de las fechas en la cotización en el momento de la actualización
                 */

                // Verificación fecha del evento debe ser menor a la
                // fecha del final del evento
                if (inputs.fechaEvento && inputs.fechaFinEvento && inputs.fechaEvento > inputs.fechaFinEvento) {
                    return exits.error("No se puede crear cotización cuya fecha de inicio sea mayor a la fecha final");
                }

                // Verificación fecha del montaje debe ser menor a la 
                // fecha del desmontaje
                if (inputs.fechaMontaje && inputs.fechaDesmontaje && inputs.fechaMontaje > inputs.fechaDesmontaje) {
                    return exits.error("No se puede crear cotización cuya fecha de montaje sea mayor a la fecha desmontaje");
                }

                /**
                 * Verificación del inventario en caso de ser alquiler o montaje
                 */

                if ((inputs.esMontaje || inputs.esAlquiler) && inputs.jsonArticulos.articulos === undefined) {
                    return exits.error("En caso de Alquiler o Montaje, por favor ingrese artículos");

                }

                /**
                * En caso de montaje o alquiler y trae inventario
                * normalizamos el inventario recibido
                */

                else if (inputs.esMontaje || inputs.esAlquiler) {

                    /**
                     * Validamos si todos los id de artículos existen en la BD
                     */
                    let idArticuloError;
                    let dbArticulos = await Articulos.find();

                    if (inputs.jsonArticulos.articulos.some((articulo) => {
                        let result = _.find(dbArticulos, (dbArticulo) => {
                            idArticuloError = articulo.id;
                            return dbArticulo.id === articulo.id;
                        });
                        return (result === undefined);
                    })) {
                        return exits.error(`El articulo con el Id ${idArticuloError} no existe en el inventario`);
                    }

                    /**
                     * Validamos los precios 
                     * en caso de no tener se le asigna el original del la BD
                     */
                    inputs.jsonArticulos.articulos.forEach((articulo, index) => {
                        if (articulo.precio === undefined) {
                            inputs.jsonArticulos.articulos[index].precio = _.find(dbArticulos, (dbArticulo) => {
                                idArticuloError = articulo.id;
                                return dbArticulo.id === articulo.id;
                            }).precio;
                        }
                    });
                    inputs.articulos = inputs.jsonArticulos.articulos;
                    delete inputs.jsonArticulos;
                }

                //Actualización de la cotización
                await Cotizaciones.update({ id: inputs.id }, inputs);
                return exits.success();
            }

        } catch (error) {
            return exits.error(error.message);
        }

    }

};
