// import './flights.styles'
import templateUrl from './flights.template'

const controller =
class FlightFlightsController {
  constructor ($log, flightsService, localStorageService) {
    'ngInject'
    // this.allFlights = undefined
    this.$log = $log
    this.service = flightsService
    this.localStorageService = localStorageService
  }

  getFlights () {
    this.allFlights = this.service.getAllFlights()
  }

  book (flights) {
    if (!this.isLoggedOn()) {
      this.service.errorMess='Please Login to Book a Flight.'
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
