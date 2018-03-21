import { FlightsService } from './flights.service'
import { flightFlights } from './flights.component'
import { config } from './flights.config'
import { BookingService } from '../booking/booking.service'

export default angular
  .module('flight.flights', [])
  .service('flightsService', FlightsService)
  .service('bookingService', BookingService)
  .component('flightFlights', flightFlights)
  .config(config)
  .name
