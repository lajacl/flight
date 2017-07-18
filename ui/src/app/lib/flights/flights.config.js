export const config =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'flights',
      url: '/flights',
      component: 'flightFlights',
      resolve: {
        allFlights: function (flightsService) {
          return flightsService.getAllFlights()
        }
      }
    })
  }
