import { h, Component } from 'preact';
import {
  initMap,
  mapPanTo,
  addMarkerToMap,
  highlightMarker,
  addCurrentPosToMap,
} from '../../MapAdapter/LeafletAdapter.js';
import {
  getStationsPromise,
  parsePoints,
  getClosestPoints,
} from '../../API/StationsApi.js';
import './stationsMap.css';

const defaultZoom = 15;

// StationsMapProps = { currentPosition: [lat, lng] }
export default class StationsMap extends Component {
  constructor(props) {
    super(props);
    this.mapInstance;
    this.markers = {};
    this.points = [];
  }

  setClosestPoints() {
    getClosestPoints(this.props.currentPosition, this.points).forEach(
      pointId => {
        highlightMarker(this.markers[pointId]);
      }
    );
  }

  showCurrentPosition() {
    addCurrentPosToMap(this.mapInstance, this.props.currentPosition);
  }

  componentDidMount() {
    this.markers = {};
    this.mapInstance;

    this.mapInstance = initMap(
      'stations-map',
      this.props.currentPosition,
      defaultZoom
    );
    this.showCurrentPosition();

    getStationsPromise().then(points => {
      this.points = points;
      points.forEach(point => {
        this.markers[point.id] = addMarkerToMap(
          this.mapInstance,
          point.coordinates
        );
      });
      this.setClosestPoints();
    });
  }

  componentDidUpdate() {
    const currentPosition = this.props.currentPosition;
    mapPanTo(this.mapInstance, currentPosition);
    this.showCurrentPosition();
    this.setClosestPoints();
  }

  render() {
    return <div id="stations-map" className="stations-map" />;
  }
}
