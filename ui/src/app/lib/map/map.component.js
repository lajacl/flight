import templateUrl from './map.component.html'

/* @ngInject */
class MapController {
  zoom = 7
  center = [35.5175, -86.5804]
  markers = []
  paths = []

  constructor ($map, locations, $log) {
    this.$map = $map
    this.$log = $log

    const colors = ['#CC0099', '#AA1100', '#2196F3', '#FF5722']

    // this.markers = [this.origin, this.destination]
    // this.paths = [this.origin, this.destination, colors[0]]

    // add markers from an angular constant
    const { memphis, nashville, knoxville } = locations
    const markers = [memphis, nashville, knoxville]

    markers.forEach(marker => this.addMarker(marker))

    // add paths manually
    const paths = [
      [memphis, nashville, '#CC0099'],
      [nashville, knoxville, '#AA1100']
    ]

    paths.forEach(args => this.addPath(...args))

    // add path from webservice
    // this.$log.log('getMarkerByCityName Origin: ' + this.origin)
    // $map.getMarkerByCityName(this.origin)
    //   .then(originCity => {
    //     $map.getMarkerByCityName(this.destination)
    //     .then(destinationCity => {
    //       this.addPath(destinationCity, originCity, colors[0])
    //     })
    //   })

    // add path from webservice
    $map.getMarkerByCityName('Chattanooga')
      .then(chattanooga => {
        this.addPath(knoxville, chattanooga, '#FF3388')
      })
  }

  addMarker ({ latitude, longitude }) {
    this.markers.push({
      position: `[${latitude}, ${longitude}]`
    })
  }

  addPath (a, b, color) {
    this.paths.push({
      path: `[[${a.latitude}, ${a.longitude}], [${b.latitude}, ${b.longitude}]]`,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 3,
      geodesic: true
    })
  }

}

export default {
  templateUrl,
  controller: MapController,
  controllerAs: '$mapCtrl',
  bindings: {
    locations: '=',
    origin: '=',
    destination: '=',
    flightTime: '='
  }

}
