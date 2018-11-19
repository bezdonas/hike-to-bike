import { h, preact } from 'preact';
import render from 'preact-render-to-json';
import App from '../App.jsx';

describe('App smoke', () => {
  it('renders and matches snapshot', () => {
    expect(render(<App />)).toMatchSnapshot();
  });
});
