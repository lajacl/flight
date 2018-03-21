import templateUrl from './app.component.html'

/* @ngInject */
class AppController {
  constructor ($log, localStorageService, $state, $location) {
    $log.debug('AppController is a go.')
    this.$location = $location
    this.localStorageService = localStorageService
    this.$log = $log
    this.$state = $state

  }

  isCurrentPath(path) {
    this.$log.log('PATH: ' + this.$location.path())
    return this.$location.path() === path
  }

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
