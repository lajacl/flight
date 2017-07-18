export const config =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'signup',
      url: '/signup',
      component: 'flightRegister'
    })
  }
