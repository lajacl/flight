// import './flights.styles'
import templateUrl from './flights.template'

const controller =
class FlightFlightsController {
  constructor ($log, flightsService, localStorageService, $interval, bookingService, $state) {
    'ngInject'
    this.$log = $log
    this.$state = $state
    this.service = flightsService
    this.localStorageService = localStorageService
    this.bookingService = bookingService

    $interval(() => {
      this.getFlights()
    }, 60000)
  }

  getFlights () {
    this.$log.log('Checking for Flight Updates')
    this.service.getAllFlights()
    .then ((data) => {
      this.allFlights = data
    })
  }

  // book(flight) {
  //   let flights = []
  //   flights.push(flight)
  // }

  bookFlight(flight) {
    if (this.isLoggedOn()) {
      let flights = []
      flights.push(flight)
      let accountId = this.localStorageService.get('accountData').id
      this.bookingService.bookFlight(accountId, flights)
        .then((data) => {
          if (data === true) {
            this.service.helpMessage = 'Your Flight Was Successfully Booked.'
            setTimeout(() => {
              this.$state.go('account')
            }, 3000)
          }
        })
    } else {
      this.service.helpMessage = 'Please Login to Book a Flight.'
    }
  }

  // Checks if a user is currently logged in
  isLoggedOn () {
    return this.localStorageService.get('accountData') !== null
  }

  getFlightsMessage () {
    return this.service.getHelpMessage()
  }
}

export const flightFlights = {
  controller,
  controllerAs: '$flightsCtrl',
  templateUrl,
  bindings: {
    allFlights: '<'
  }
}
