export const config =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'register',
      url: '/register',
      component: 'flightRegister'
    })
  }
