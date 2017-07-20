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
      this.service.logon(this.email, this.password)
      .then((data) => {
        this.$state.reload('account')
      })
    }

    logout () {
      this.service.logout()
      this.$state.reload('flights')
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
