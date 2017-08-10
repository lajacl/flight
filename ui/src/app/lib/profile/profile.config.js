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
        },
        itineraries: (localStorageService, profileService) => {
          return profileService.getFlights(localStorageService.get('accountData').id)
        }
      }
    })
  }
