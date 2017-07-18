import { FlightsService } from './flights.service'
import { flightFlights } from './flights.component'
import { config } from './flights.config'

export default angular
  .module('flight.flights', [])
  .service('flightsService', FlightsService)
  .component('flightFlights', flightFlights)
  .config(config)
  .name
