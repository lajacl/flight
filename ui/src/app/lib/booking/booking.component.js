// import './booking.styles'
import templateUrl from './booking.template'

const controller =
  class FlightBookingController {
    constructor ($log, bookingService, $state, localStorageService) {
      'ngInject'
      this.service = bookingService
      this.$state = $state
      this.searched = false
      this.$log = $log
      this.localStorageService = localStorageService
    }

    searchFlights () {
      this.service.errorMess = null
      if ((angular.equals(this.origin, ' ')) || (angular.equals(this.destination, null))) {
        this.service.errorMess = 'Please select an origin and destination city'
      } else {
        this.searched = true
        this.selectFlights = this.service.searchFlights(this.origin, this.destination, this.allFlights)
      }
    }

    bookFlight (flights) {
      let account = this.localStorageService.get('accountData')
        console.log(account)
        console.log(flights)
      this.service.bookFlight(flights, account)
      // .then((data) => {
      //   if (data === true) {
      //     this.$state.reload()
      //   }
      // })
    }

    // setTripTime (time) {
    //   this.tripTime += time
    // }

    // flightChange () {
    //
    // }

    // getAllFlights () {
    //   allFlights = this.service.getAllFlights()
    // }

    bookingError () {
      return this.service.errorMessage()
    }
  }

export const flightBooking = {
  controller,
  templateUrl,
  controllerAs: 'booking',
  bindings: {
    allFlights: '<',
    selectFlights: '<',
    locations: '=',
    origin: '=',
    destination: '=',
    flightTime: '='
  }
}
