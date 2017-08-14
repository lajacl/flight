// import './booking.styles'
import templateUrl from './booking.template'

const controller =
  class FlightBookingController {
    constructor ($log, bookingService, $state, localStorageService, $interval) {
      'ngInject'
      this.service = bookingService
      this.$state = $state
      this.$log = $log
      this.localStorageService = localStorageService
      this.searched = false

      // $interval(() => {
      //   this.$log.log('Updating Search Results')
      //   this.searchFlights()
      // }, 60000)
    }

    searchFlights () {
      this.service.errorMess = null
      if ((angular.equals(this.origin, ' ')) || (angular.equals(this.destination, null))) {
        this.service.errorMess = 'Please select an origin and destination city'
      } else {
        this.searched = true
        this.service.searchFlights(this.origin, this.destination, this.allFlights)
        .then ((data) => {
          this.selectFlights = data
        })
      }
    }

    bookFlight (flights) {
      this.service.errorMess = null
      if(this.isLoggedOn()){
        let accountId = this.localStorageService.get('accountData').id
          // console.log(account)
          // console.log(flights)
        this.service.bookFlight(accountId, flights)
        .then((data) => {
          if (data === true) {
            this.$state.reload()
            this.service.errorMess='Your Flight Was Successfully Booked'
          }
        })
      } else {
        this.service.errorMess='Please Login to Book a Flight.'
      }
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

    // Checks if a user is currently logged in
    isLoggedOn () {
      return this.localStorageService.get('accountData') !== null
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
    locations: '='
    // selectFlights: '<',
    // origin: '=',
    // destination: '=',
    // flightTime: '='
  }
}
