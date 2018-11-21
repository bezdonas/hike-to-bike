import { h, Component } from 'preact';
import './show-all.css';

// ShowAllStationsCheckboxProps = {
//  showAllStations: boolean,
//  toggleShowAllStations: function,
// }
export default class ShowAllStationsCheckbox extends Component {
  render(props) {
    const { showAllStations, toggleShowAllStations } = this.props;
    return (
      <div class="show-all-wrapper">
        <label>
          Show all stations{' '}
          <input
            type="checkbox"
            onClick={toggleShowAllStations}
            value={showAllStations}
          />
        </label>
      </div>
    );
  }
}
