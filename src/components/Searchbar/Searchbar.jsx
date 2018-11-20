import { h, Component } from 'preact';
import './searchbar.css';

// SearchBarProps = {
//  position: [lat, lng],
//  changePosition: function
// }
export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  handleSearchChange(e) {
    this.props.changePosition(e.target.value);
  }
  render(props) {
    return (
      <input
        className="searchbar"
        type="text"
        value={props.position}
        onChange={this.handleSearchChange}
      />
    );
  }
}
