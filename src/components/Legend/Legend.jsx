import { h, Component } from 'preact';
import './legend.css';

export default class Legend extends Component {
  render() {
    return (
      <div className="legend-block">
        <h3>Legend</h3>
        <p>
          <img
            src="https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon-2x.png"
            class="leaflet-marker-icon"
          />{' '}
          &mdash; Healthy station
        </p>
        <p>
          <img
            src="https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon-2x.png"
            class="leaflet-marker-icon"
            style="opacity: 0.5"
          />{' '}
          &mdash; Near-empty station
        </p>
        <span class="note">Markers are clickable for details</span>
      </div>
    );
  }
}
