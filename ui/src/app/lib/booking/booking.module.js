import { BookingService } from './booking.service'
import { flightBooking } from './booking.component'
import { config } from './booking.config'

export default angular
  .module('flight.booking', [])
  .service('bookingService', BookingService)
  .component('flightBooking', flightBooking)
  .config(config)
  .name
