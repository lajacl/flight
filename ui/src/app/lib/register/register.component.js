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
      if (!this.service.accountExists()) {
        this.service.newAccount(this.username, this.password, this.email, this.phone,
        this.firstName, this.lastName)
      } else {
        this.service.errorMess = 'Already a current account holder. Please login.'
      }
      // .then((data) => {
      //   if (data === true) {
      //     this.$state.reload('profile')
      //   }
      // })
    }

  //   signupError () {
  //     return this.service.errorMessage()
  //   }
  }

export const flightRegister = {
  controller,
  templateUrl,
  controllerAs: 'register',
  bindings: {
    username: '<',
    password: '<',
    email: '<',
    phone: '<',
    firstName: '<',
    lastName: '<'
  }
}
