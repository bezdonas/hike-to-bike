import { parsePoints } from '../StationsApi.js';
import RawPoints from '../__mocks__/RawPoints.js';
import ParsedPoints from '../__mocks__/ParsedPoints.js';
import cloneDeep from 'lodash';

describe('parsePoints function', () => {
  describe('parsePoints function', () => {
    it('should parse RawPoints into ParsedPoints', () => {
      const rawPoints = cloneDeep(RawPoints);
      const parsedPoints = cloneDeep(ParsedPoints);
      expect(cloneDeep(parsePoints(rawPoints))).toEqual(parsedPoints);
    });
  });
});
