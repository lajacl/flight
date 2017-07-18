export const config =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'map',
      url: '/map',
      data: { requiresAuth: true },
      component: 'flightMap'
    })
  }
