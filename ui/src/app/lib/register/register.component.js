// import './register.styles'
import templateUrl from './register.template'

const controller =
  class FlightRegisterController {
    constructor ($log, registerService, $state) {
      'ngInject'
      this.service = registerService
      this.$state = $state
      this.$log = $log

      this.account = {}
    }

    exists () {
      return this.service.accountExists(this.account.email)
      .then((data) => {
        return data
      })
    }

    signup (formValid) {
      this.service.errorMess = null
      if (formValid) {
        this.exists()
        .then((data) => {
          if(data === false) {
            this.service.createAccount(this.account)
            .then(() => {
            this.$state.go('account', this.account)
            })
          } else {
            this.service.errorMess = 'This email is already being used. Please login.'
            setTimeout (() => {
              this.$state.go('login')
            }, 5000)
          }
        })
      } else {
      this.service.errorMess = 'Please make sure all fields are entered correctly.'
      }
      // if (!this.exists()) {
      // this.service.createAccount(this.account)
      // }
    }
    // this.email, this.password, this.firstName, this.lastName, this.phone

    signupError () {
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
