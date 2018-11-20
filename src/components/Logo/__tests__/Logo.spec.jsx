import { h, preact } from 'preact';
import render from 'preact-render-to-json';
import Logo from '../Logo.jsx';

describe('Logo', () => {
  it('renders as expected and matches snapshot', () => {
    expect(render(<Logo />)).toMatchSnapshot();
  });
});
