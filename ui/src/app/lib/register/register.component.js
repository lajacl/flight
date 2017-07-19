// import './register.styles'
import templateUrl from './register.template'

const controller =
  class FlightRegisterController {
    constructor ($log, registerService, $state) {
      'ngInject'
      this.service = registerService
      this.$state = $state
      this.$log = $log
    }

    signup () {
      this.signupError(null)
      if (this.service.accountExists(this.email) === false) {
        this.$log.log('New account being created, Email: ' + this.email)
        this.service.newAccount(this.email, this.password,
        this.firstName, this.lastName, this.phone)
      } else {
        this.signupError('Already a current account holder. Please login.')
      }
      // .then((data) => {
      //   if (data === true) {
      //     this.$state.reload('profile')
      //   }
      // })
    }

    signupError (err) {
      this.service.errorMess = err
      return this.service.errorMessage()
    }
  }

export const flightRegister = {
  controller,
  templateUrl,
  controllerAs: 'register',
  bindings: {
    password: '=',
    email: '=',
    phone: '=',
    firstName: '=',
    lastName: '='
  }
}
