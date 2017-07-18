export const config =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'booking',
      url: '/booking',
      component: 'flightBooking',
      resolve: {
        locations: function (bookingService) {
          return bookingService.getLocations()
        }
      }
    })
  }
