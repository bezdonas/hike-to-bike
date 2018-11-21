import { h, preact } from 'preact';
import 'preact-compat';
import render from 'preact-render-to-json';
import Searchbar from '../Searchbar.jsx';

describe('Searchbar', () => {
  it('renders as expected and matches snapshot', () => {
    const props = {
      changePosition: () => false,
    };
    expect(render(<Searchbar {...props} />)).toMatchSnapshot();
  });
});
