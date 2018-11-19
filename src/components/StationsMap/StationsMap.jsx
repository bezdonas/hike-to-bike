import { h, Component } from 'preact';
import { initMap, addMarkerToMap } from '../../MapAdapter/LeafletAdapter.js';
import './stationsMap.css';

export default class StationsMap extends Component {
  componentDidMount() {
    const mapInstance = initMap('stations-map', [51.505, -0.09], 13);
    addMarkerToMap(mapInstance, [51.513, -0.12], {
      title: 'I am marker!',
      opacity: 0.75,
    });
  }
  render() {
    return <div id="stations-map" className="stations-map" />;
  }
}
