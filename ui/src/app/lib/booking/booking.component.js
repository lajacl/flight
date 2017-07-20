// import './booking.styles'
import templateUrl from './booking.template'

const controller =
  class FlightBookingController {
    constructor ($log, bookingService, $state) {
      'ngInject'
      this.service = bookingService
      this.$state = $state
      this.searched = false
      this.$log = $log
    }
    // allFlights = []

    searchFlights () {
      // this.allFlights = this.getAllFlights()
      if ((this.origin === ' ') || (this.destination === undefined)) {
        this.service.errorMess = 'Please select an origin and destination city'
      } else {
        this.searched = true
        this.service.errorMess = null
        this.selectFlights = this.service.searchFlights(this.origin, this.destination, this.allFlights)
      }
    }

    bookFlight () {
      this.service.bookFlight(this.flightId)
      .then((data) => {
        if (data === true) {
          this.$state.reload()
        }
      })
    }

    getAllFlights () {
      return this.service.getAllFlights()
    }

    bookingError () {
      return this.service.errorMessage()
    }
  }

export const flightBooking = {
  controller,
  templateUrl,
  controllerAs: 'booking',
  bindings: {
    allFlights: '=',
    selectFlights: '=',
    locations: '<',
    origin: '=',
    destination: '='
  }
}
