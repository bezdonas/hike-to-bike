import { h, Component } from 'preact';
import './searchbar.css';
import Autocomplete from 'react-autocomplete';
import debounce from 'lodash/debounce';
import { geocodeAddress } from '../../GeocodingApi/MapboxGeocoder.js';

// SearchBarProps = {
//  changePosition: function,
// }
// SearchBarState = {
//  searchQuery: string,
//  searchSuggestions: [],
// }

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchSuggestions: [],
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onQuerySubmit = this.onQuerySubmit.bind(this);

    const geocodeDebounceLag = 200;
    this.debouncedGeocodeAddress = debounce(() => {
      geocodeAddress(this.state.searchQuery).then(sugestions => {
        this.setState({
          searchSuggestions: sugestions,
        });
      });
    }, geocodeDebounceLag);
  }

  onQueryChange(event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
    });
    if (searchQuery) {
      this.debouncedGeocodeAddress();
    }
  }

  onQuerySubmit(val, item) {
    this.setState({
      searchQuery: val,
    });
    if (val === '') {
      return;
    }
    // Mapboxes API's coords are flipped in relation to leaflet
    const flipCoords = coords => [coords[1], coords[0]];
    this.props.changePosition(flipCoords(item.center));
  }

  render(props) {
    const { searchQuery, searchSuggestions, showAllStations } = this.state;
    return (
      <div className="searchbar">
        <Autocomplete
          wrapperProps={{ className: 'autocomplete-wrapper' }}
          inputProps={{ placeholder: 'Where are you?' }}
          getItemValue={item => item.place_name}
          items={searchSuggestions}
          renderItem={(item, isHighlighted) => (
            <div
              className={`autocomplete-proposition ${isHighlighted &&
                'selected'}`}
            >
              {item.place_name}
            </div>
          )}
          value={searchQuery}
          onChange={this.onQueryChange}
          onSelect={this.onQuerySubmit}
        />
      </div>
    );
  }
}
