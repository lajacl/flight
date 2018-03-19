export class RegisterService {
  constructor($q, localStorageService, $http, $log, $state, apiUrl) {
    'ngInject'
    this.$q = $q
    this.localStorageService = localStorageService
    this.$http = $http
    this.$log = $log
    this.$state = $state
    this.apiUrl = apiUrl
  }

  helpMessage = ''

  getHelpMessage() {
    return this.helpMessage
  }

  accountExists(email) {
    return this.$http({
      method: 'GET',
      url: this.apiUrl + '/account/exists',
      params: { email: email },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.data
    }, (response) => {
      this.$log.log('Account Exisits Error')
      return true
    })
  }

  createAccount(account) {
    return this.$http({
      method: 'POST',
      url: this.apiUrl + '/account/register',
      data: account
    }).then((response) => {
      if (this.accountValid(response)) {
        this.registerSuccess(response);
      } else {
        this.registerFailed();
      }
    }, (response) => {
      this.helpMessage = 'Registration is unavailable at this time. Please try again later.'
    })
  }

  accountValid(response) {
    return response.data !== null;
  }

  registerSuccess(response) {
    this.localStorageService.set('accountData', response.data);
    this.helpMessage = 'Registration Successful';
    setTimeout(() => {
      this.$state.go('account', this.account);
    }, 3000);
  }

  registerFailed() {
    this.helpMessage = 'Registration not successful. Please try again later.';
  }
}