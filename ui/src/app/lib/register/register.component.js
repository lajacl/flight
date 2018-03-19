// import './register.styles'
import templateUrl from './register.template'

const controller =
  class FlightRegisterController {
    constructor(registerService, $state, $log) {
      'ngInject'
      this.service = registerService
      this.$state = $state
      this.$log = $log

      this.account = {}
      this.showForm = true
      this.service.helpMessage = ''
    }
    
    register() {
      this.showForm = false
      this.service.helpMessage = 'Form Submitted'
      let exists = this.accountExists()
      this.$log.log('Exists: ' + exists)
      this.$log.log('Does Account Exist: ' + this.exists)
      this.exists ? this.sayLogin() : this.createAccount()
    }    

    accountExists() {
      return this.service.accountExists(this.account.email)
    }

    createAccount() {      
      this.service.createAccount(this.account)
    }

    sayLogin() {     
      this.showForm = true 
      this.service.helpMessage = `There is an account for this email already. 
      If the account is yours please login.`
    }

    getRegisterMessage() {
      return this.service.getHelpMessage()
    }
  }

export const flightRegister = {
  controller,
  templateUrl,
  controllerAs: '$regCtrl',
  bindings: {
    account: '='
  }
}