// import './login.styles'
import templateUrl from './login.template'

const controller =
  class FlightLoginController {
    constructor($log, loginService, $state) {
      'ngInject'
      // this.isLoggedIn()
      this.service = loginService
      this.$state = $state

      this.showForm = true
      this.service.helpMessage = ''
    }

    login() {
      this.showForm = false
      this.service.helpMessage = 'Logging In ...'
      this.service.login(this.email, this.password)
      .then ((loginSuccess)=> {
        if(loginSuccess) {          
          this.helpMessage = 'Login Successful'
          setTimeout(()=> {          
            this.isLoggedIn()
          }, 3000)     
        }
        else {          
        this.service.helpMessage = 'Unsuccessful login attempt. Please try again.'
        this.showForm = true
        }
      })
    }

    isLoggedIn() {
      this.service.isLoggedIn()
    }

    getLoginMessage() {
      return this.service.getHelpMessage()
    }
  }

export const flightLogin = {
  controller,
  templateUrl,
  controllerAs: '$loginCtrl',
  bindings: {
  }
}
