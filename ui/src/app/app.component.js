import templateUrl from './app.component.html'

/* @ngInject */
class AppController {
  constructor ($log, localStorageService, $state) {
    $log.debug('AppController is a go.')
    this.localStorageService = localStorageService
    this.$log = $log
    this.$state = $state
  }

  // checks if a flier is currently logged in
  isLoggedOn () {
    return this.localStorageService.get('accountData') !== null
  }

  logout () {
    this.localStorageService.clearAll()
    this.$state.go('login')
  }

}

export default {
  templateUrl,
  controller: AppController,
  controllerAs: '$appCtrl'
}
