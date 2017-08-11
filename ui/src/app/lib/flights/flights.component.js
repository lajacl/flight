// import './flights.styles'
import templateUrl from './flights.template'

const controller =
class FlightFlightsController {
  constructor ($log, flightsService, localStorageService, $interval) {
    'ngInject'
    this.$log = $log
    this.service = flightsService
    this.localStorageService = localStorageService

    $interval(() => {
      this.getFlights()
    }, 1000)
  }

  getFlights () {
    // this.$log.log('Updating Flights')
    this.service.getAllFlights()
    .then ((data) => {
      this.allFlights = data
    })
  }

  book (flights) {
    if (!this.isLoggedOn()) {
      this.service.errorMess='Please Login to Book a Flight.'
    }
    else {

    }
  }

  // Checks if a user is currently logged in
  isLoggedOn () {
    return this.localStorageService.get('accountData') !== null
  }

  flightsError () {
    return this.service.errorMessage()
  }

}

export const flightFlights = {
  controller,
  controllerAs: 'flights',
  templateUrl,
  bindings: {
    allFlights: '<'
  }
}
