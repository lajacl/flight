export class LoginService {
  constructor(localStorageService, $http, $log, apiUrl, $state, $q) {
    'ngInject'
    this.localStorageService = localStorageService
    this.$http = $http
    this.$log = $log
    this.apiUrl = apiUrl
    this.account = {}
    this.$state = $state
    this.$q = $q
  }

  helpMessage = ''

  getHelpMessage() {
    return this.helpMessage
  }

  isLoggedIn() {
    this.account = this.localStorageService.get('accountData')
    if (this.account !== null) {
      this.$state.go('account', this.account)
    }
  }

  login(email, password) {
    return this.$http({
      method: 'POST',
      url: this.apiUrl + '/account/login',
      params: { email: email, password: password }
    }).then((response) => {
      if (response.data.email !== null) {
        this.localStorageService.set('accountData', response.data)
        return true
      }
      return false
    }, (response) => {
      return false
    })
  }
}
