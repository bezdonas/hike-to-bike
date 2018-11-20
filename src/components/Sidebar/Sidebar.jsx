import { h, Component } from 'preact';
import './sidebar.css';

export default class Sidebar extends Component {
  render() {
    return <aside className="sidebar">{this.props.children}</aside>;
  }
}
