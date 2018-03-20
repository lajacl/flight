// import './booking.styles'
import templateUrl from './booking.template'

const controller =
  class FlightBookingController {
    constructor($log, bookingService, $state, localStorageService, $interval) {
      'ngInject'
      this.service = bookingService
      this.$state = $state
      this.$log = $log
      this.localStorageService = localStorageService
      this.searched = false
      this.service.helpMessage = null

      $interval(() => {
        this.searchFlights()
      }, 300000)
    }

    searchFlights() {
      this.service.helpMessage = null
      if ((angular.equals(this.origin, ' ')) || (angular.equals(this.destination, null))) {
        this.service.helpMessage = 'Please select an origin and destination city'
      } else {
        this.searched = true
        this.currentOrigin = this.origin
        this.currentDestination = this.destination
        this.service.searchFlights(this.origin, this.destination, this.allFlights)
          .then((data) => {
            this.selectFlights = data
          })
      }
    }

    bookFlight(flights) {
      this.service.helpMessage = null
      if (this.isLoggedOn()) {
        let accountId = this.localStorageService.get('accountData').id
        // console.log(account)
        // console.log(flights)
        this.service.bookFlight(accountId, flights)
          .then((data) => {
            if (data === true) {
              this.$state.reload()
              this.service.helpMessage = 'Your Flight Was Successfully Booked'
            }
          })
      } else {
        this.service.helpMessage = 'Please Login to Book a Flight.'
      }
    }

    isLoggedOn() {
      return this.localStorageService.get('accountData') !== null
    }

    bookingMessage() {
      return this.service.getHelpMessage()
    }

  }

export const flightBooking = {
  controller,
  templateUrl,
  controllerAs: '$bookCtrl',
  bindings: {
    locations: '='
  }
}
