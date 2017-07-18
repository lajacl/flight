export const config =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'login',
      url: '/login',
      component: 'flightLogin'
    })
  }
