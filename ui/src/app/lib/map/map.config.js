export const config =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'map',
      url: '/map',
      component: 'flightMap'
    })
  }
