// import './profile.styles'
import templateUrl from './profile.template'

const controller =
  class FlightProfileController {
    constructor ($log, profileService, loginService, localStorageService, $state) {
      'ngInject'
      this.service = profileService
      this.$state = $state
      $log.debug('flight-profile')
      this.localStorageService = localStorageService
      this.loginService = loginService
      this.$log = $log
    }

    get username () {
      return this.flier.username
    }

    get fName () {
      return this.flier.firstName
    }

    get lName () {
      return this.flier.lastName
    }

    get email () {
      return this.flier.email
    }

    get phone () {
      return this.flier.phone
    }

    set fName (fName) {
      this.flier.firstName = fName
    }

    set lName (lName) {
      this.flier.lastName = lName
    }

    set email (address) {
      this.flier.email = address
    }

    set phone (number) {
      this.flier.phone = number
    }

    getFlierFlights () {
      if (this.service.isLoggedOn()) {
        this.service.getFlierFlights(this.username).then(() =>
        this.$state.reload('profile'))
      } else {
        this.service.errorMessage = 'Log In To View Flights For This Flier: ' + this.email
        this.$log.log('Not Logged In To View Flights For This Flier: ' + this.email)
      }
    }

    deleteAccount () {
      this.service.deleteAccount()
      this.$state.go('login')
    }

    // shows or hides profile update form
    updateForm () {
      if (this.formOpen === false) {
        this.formOpen = true
      } else {
        this.formOpen = false
      }
    }

    updateProfile () {
      this.service.updateUser(this.email, this.fName, this.lName, this.phone)
      this.updateForm()
    }

    isLoggedOn () {
      return this.service.isLoggedOn()
    }

}

export const flightProfile = {
  controller,
  templateUrl,
  controllerAs: 'profile',
  bindings: {
    exists: '=',
    flier: '='
  }
}
