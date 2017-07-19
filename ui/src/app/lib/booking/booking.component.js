// import './booking.styles'
import templateUrl from './booking.template'

const controller =
  class FlightBookingController {
    constructor ($log, bookingService, $state) {
      'ngInject'
      this.service = bookingService
      this.$state = $state
    }

    searchFlights () {
      this.selectFlights = this.service.searchFlights(this.origin, this.destination)
    }

    findFlights () {
      this.service.findFlights(this.flightId)
      .then((data) => {
        if (data === true) {
          this.$state.reload()
        }
      })
    }

    getAllFlights () {
      this.allFlights = this.service.getAllFlights()
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
    allFlights: '<',
    selectFlights: '<',
    locations: '<',
    origin: '<',
    destination: '<'
  }
}
