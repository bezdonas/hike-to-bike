import { h, Component } from 'preact';
import {
  initMap,
  mapPanTo,
  addMarkerToMap,
  addCurrentPosToMap,
  removeMapLayer,
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
    this.currentPositionMarker;
    this.markers = {};
    this.points = [];
    this.closestPointIds = [];
  }

  addClosestPoints() {
    this.closestPointIds = getClosestPoints(
      this.props.currentPosition,
      this.points
    );
    this.closestPointIds.forEach(pointId => {
      this.markers[pointId] = addMarkerToMap(
        this.mapInstance,
        // TODO: this is lousy: rethink structure of data keep
        this.points.filter(point => point.id === pointId)[0].coordinates
      );
    });
  }

  removeOldClosestPoints() {
    this.closestPointIds.forEach(pointId => {
      removeMapLayer(this.markers[pointId]);
    });
  }

  showCurrentPosition() {
    this.currentPositionMarker = addCurrentPosToMap(
      this.mapInstance,
      this.props.currentPosition
    );
  }

  removeOldCurrentPosition() {
    removeMapLayer(this.currentPositionMarker);
  }

  componentDidMount() {
    this.mapInstance = initMap(
      'stations-map',
      this.props.currentPosition,
      defaultZoom
    );
    this.showCurrentPosition();

    getStationsPromise().then(points => {
      this.points = points;
      this.addClosestPoints();
    });
  }

  componentWillUpdate() {
    this.removeOldClosestPoints();
    this.removeOldCurrentPosition();
  }

  componentDidUpdate() {
    mapPanTo(this.mapInstance, this.props.currentPosition);
    this.showCurrentPosition();
    this.addClosestPoints();
  }

  render() {
    return <div id="stations-map" className="stations-map" />;
  }
}
