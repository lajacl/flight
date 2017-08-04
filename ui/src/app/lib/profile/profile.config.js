export const config =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'account',
      url: '/account',
      data: { requiresAuth: true },
      component: 'flightProfile',
      resolve: {
        account: (localStorageService) => {
          return localStorageService.get('accountData')
          }
        }
      //   flights: function (profileService, $transition$) {
      //     return profileService.getFlights($transition$.params().username)
      //   },
      //   exists: (loginService, $transition$) => {
      //     return loginService.flierExists($transition$.params().username)
      //   }
      // }
    })
  }
