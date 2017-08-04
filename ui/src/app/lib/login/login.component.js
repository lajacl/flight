// import './login.styles'
import templateUrl from './login.template'

const controller =
  class FlightLoginController {
    constructor ($log, loginService, $state) {
      'ngInject'
      this.service = loginService
      this.$state = $state
    }

    logon () {
      this.service.errorMess = null
      this.service.accountLogon(this.email, this.password)
      .then((success) => {
        if(success === true) {
          this.$state.go('account')
        } else {
          this.service.errorMess = 'Unsuccessful login attempt. Please try again.'
        }
      })
    }

    logonError () {
      return this.service.errorMessage()
    }

  }

export const flightLogin = {
  controller,
  templateUrl,
  controllerAs: 'login',
  bindings: {
    email: '=',
    password: '='
  }
}
