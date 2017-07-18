// import './register.styles'
import templateUrl from './register.template'

const controller =
  class FlightRegisterController {
    constructor ($log, registerService, $state) {
      'ngInject'
      this.service = registerService
      this.$state = $state
      $log.debug('flight-register ...')
    }

    signup () {
      this.service.register(this.username, this.password, this.email,
        this.firstName, this.lastName, this.phone)
      .then((data) => {
        if (data === true) {
          this.$state.reload('profile')
        }
      })
    }

    signupError () {
      return this.service.errorMessage()
    }
  }

export const flightRegister = {
  controller,
  templateUrl,
  controllerAs: 'register',
  bindings: {
    username: '<',
    password: '<',
    email: '<',
    firstName: '<',
    lastName: '<',
    phoneNumber: '<'
  }
}
