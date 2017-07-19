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

    exists () {
      if (!this.service.accountExists(this.account.email)) {

      } else {
        this.signupError('Already a current account holder. Please login.')
      }
    }

    signup () {
      this.signupError(null)
      this.service.newAccount(this.account).then(() =>
      this.$state.reload('profile'))
    }
    // this.email, this.password, this.firstName, this.lastName, this.phone

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
    account: '='
  }
}
