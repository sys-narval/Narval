module.exports = {


    friendlyName: 'Insertar cotización',
  
  
    description: '',
  
  
inputs: {
 id: {
    type: "number",
    description: "ID de la cotización a extraer (en caso de conocerlo)"
    }
},
  
  
exits: {
    cotizacionNoEncontrada: {
        message: "No se encuentra la cotización solicitado",
        responseType: "notFound"
    }
},
  
  
fn: async function (inputs, exits) {
    try {
  
    let cotizacion = await Cotizaciones.findOne({
            id: inputs.id
    })
  
    if (cotizacion === undefined) {
        return exits.cotizacionNoEncontrada(`Cotización ${inputs.id} no encontrada`);
    }

    if (cotizacion.esMontaje || cotizacion.esAlquiler) {
        let dbArticulos = await Articulos.find({
            where: {
            id: {
                in: cotizacion.articulos.map(articulo => articulo.id)
            }
        },
            select: ["id", "descripcion", "categoria", "unidadMedida"]
        });
    
        cotizacion.articulos = cotizacion.articulos.map((articulo, index) => Object.assign(articulo, dbArticulos[index]));
        }

        delete cotizacion.id;
        await Cotizaciones.create(cotizacion);
        return exits.success();
  
      } catch (error) {
  
        return exits.error(error.message);
  
      }
  
    }

};