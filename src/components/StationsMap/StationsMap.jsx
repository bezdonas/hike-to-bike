import { h, Component } from 'preact';
import { initMap, addMarkerToMap } from '../../MapAdapter/LeafletAdapter.js';
import { getPromise, parsePoints } from '../../API/StationsApi.js';
import './stationsMap.css';

export default class StationsMap extends Component {
  componentDidMount() {
    const mapInstance = initMap('stations-map', [39.95355, -75.17192], 13);
    getPromise().then(resp => {
      parsePoints(resp.features).forEach(point => {
        addMarkerToMap(mapInstance, point.coordinates);
      });
    });
  }
  render() {
    return <div id="stations-map" className="stations-map" />;
  }
}
