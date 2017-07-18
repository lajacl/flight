// import './login.styles'
import templateUrl from './login.template'

const controller =
  class FlightLoginController {
    constructor ($log, loginService, $state) {
      'ngInject'
      this.service = loginService
      $log.debug('flight-login ...')
      this.$state = $state
    }

    successfulLogin () {
      return this.service.isAuthenticated()
    }

    login () {
      this.service.authenticate(this.username, this.password)
                                .then((data) => {
                                  if (data === true) {
                                    this.$state.reload('flights')
                                  }
                                })
    }

    logout () {
      this.service.logout()
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
