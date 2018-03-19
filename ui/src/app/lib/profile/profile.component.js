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
      this.mapOpened = -1
    }

    get fName () {
      return this.account.firstName
    }

    get lName () {
      return this.account.lastName
    }

    get email () {
      return this.account.email
    }

    get phone () {
      return this.account.phone
    }

    set fName (fName) {
      this.account.firstName = fName
    }

    set lName (lName) {
      this.account.lastName = lName
    }

    set email (address) {
      this.account.email = address
    }

    set phone (number) {
      this.account.phone = number
    }

    flights () {
      if (this.service.isLoggedOn()) {
        this.service.getFlights(this.account.email)
        // .then(() =>
        // this.$state.reload('profile'))
      } else {
        this.service.errorMessage = 'Log In To View Flights.'
        this.$log.log('Not Logged In To View Flights For This Flier: ' + this.account.email)
      }
    }

    delete () {
      this.service.deleteAccount()
      this.$state.go('login')
    }

    openMap (index) {
      this.$log.log('Index: ' + index)
      if(this.mapOpened === index) {
        this.mapOpened = -1
      } else {
        this.mapOpened = index
      }
    }

    // shows or hides profile update form
    form () {
      if (this.formOpen === false) {
        this.formOpen = true
      } else {
        this.formOpen = false
      }
    }

    update () {
      this.service.updateAccount(this.account)
      this.updateForm()
    }

    // Checks if a user is currently logged in
    isLoggedOn () {
      return this.localStorageService.get('accountData') !== null
    }

    profileError () {
      return this.service.errorMessage()
    }

}

export const flightProfile = {
  controller,
  templateUrl,
  controllerAs: '$profileCtrl',
  bindings: {
    account: '=',
    itineraries: '='
  }
}
