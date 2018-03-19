/* @ngInject */
class MapService {
  constructor ($http, apiUrl, $log) {
    this.$http = $http
    this.apiUrl = apiUrl
    this.$log = $log
  }

  getMarkerByCityName (name) {
    return this.$http
      .get(`${this.apiUrl}/locations/name`, { params: { name } })
      .then(result => {
        return result.data
      })
  }
}

export default MapService
