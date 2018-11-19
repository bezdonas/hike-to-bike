import giveFruit from '../index.js';

describe('giveFruit function', () => {
  it('Gives you a fruit', () => {
    expect(giveFruit()).toEqual('pineapple');
  });
});
