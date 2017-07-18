// import './booking.styles'
import templateUrl from './booking.template'

const controller =
  class FlightBookingController {
    constructor ($log, bookingService, $state) {
      'ngInject'
      this.service = bookingService
      this.$state = $state
      $log.debug('flight-booking ...')
    }

    searchFlights () {
      this.service.searchFlights(this.origin, this.destination)
    }

    bookFlight () {
      this.service.bookFlight(this.flightId)
      .then((data) => {
        if (data === true) {
          this.$state.reload()
        }
      })
    }

    bookingError () {
      return this.service.bookingMessage()
    }
  }

export const flightBooking = {
  controller,
  templateUrl,
  controllerAs: 'booking',
  bindings: {
    origin: '<',
    destination: '<'
  }
}
