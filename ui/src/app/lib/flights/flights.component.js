// import './flights.styles'
import templateUrl from './flights.template'

const controller =
class FlightFlightsController {
  constructor ($log, flightsService) {
    'ngInject'
    // this.allFlights = undefined
    $log.log('flight-flights ...')
    this.$log = $log
    this.service = flightsService
  }

  getFlights () {
    this.allFlights = this.service.getAllFlights()
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
