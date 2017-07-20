// import './login.styles'
import templateUrl from './login.template'

const controller =
  class FlightLoginController {
    constructor ($log, loginService, $state) {
      'ngInject'
      this.service = loginService
      this.$state = $state
    }

    // successfulLogin () {
    //   return this.service.isLoggedOn()
    // }

    logon () {
      this.logonError(null)
      if (this.service.logon(this.email, this.password)) {
        this.$state.reload('account')
      } else {
        this.loginError('Incorrect password')
      }
    }

    logout () {
      this.service.logout()
      this.$state.reload('flights')
    }

    logonError (err) {
      this.service.errorMess = err
      return this.service.errorMessage()
    }

  }

export const flightLogin = {
  controller,
  templateUrl,
  controllerAs: 'login',
  bindings: {
    username: '<',
    password: '<'
  }
}
