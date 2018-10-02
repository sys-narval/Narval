module.exports = {


  friendlyName: 'View cotizaciones',


  description: 'Display "Cotizaciones" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/ventas/cotizaciones'
    }

  },


  fn: async function (inputs, exits) {

    let modelo = {
      cotizaciones: [{
          id: 1,
          encargado: 'Adrian Chavarria',
          cliente: 'Coca-Cola',
          ubicacion: 'Tamarindo, Guanacaste',
          fechaMontaje: '2018-10-01',
          fechaEvento: '2018-10-01',
          fechaFin: '2018-12-05',
          descripcion: 'Evento de CocaCola en playa tamarindo',
          materiales: [{
            codigo: '1',
            descripcion: 'Tross 2m',
            cantidad: '20'
          }]
        },
        {
          id: 2,
          encargado: 'Antonio Quesada',
          cliente: 'Imperial',
          ubicacion: 'Puerto Viejo, Limon',
          fechaMontaje: '2018-09-30',
          fechaEvento: '2018-09-31',
          fechaFin: '2018-10-05',
          descripcion: 'Fiesta Imperial'
        }
      ]
    };

    // Respond with view.
    return exits.success({
      modelo
    });

  }


};
