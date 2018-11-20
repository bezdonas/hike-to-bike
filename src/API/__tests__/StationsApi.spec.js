import { parsePoints, getClosestPoints } from '../StationsApi.js';
import RawPoints from '../__mocks__/RawPoints.js';
import ParsedPoints from '../__mocks__/ParsedPoints.js';
import cloneDeep from 'lodash';

describe('StationsApi', () => {
  describe('parsePoints function', () => {
    it('should parse RawPoints into ParsedPoints', () => {
      const rawPoints = cloneDeep(RawPoints);
      const parsedPoints = cloneDeep(ParsedPoints);
      expect(cloneDeep(parsePoints(rawPoints))).toEqual(parsedPoints);
    });
  });

  describe('getClosestPoints function', () => {
    it('should return ids[] of closest ${quantity} points to passed coords', () => {
      const parsedPoints = cloneDeep(ParsedPoints);
      expect(getClosestPoints([39.95378, -75.16374], parsedPoints, 1)).toEqual([
        3004,
      ]);
      expect(getClosestPoints([39.94517, -75.15993], parsedPoints, 3)).toEqual([
        3007,
        3101,
        3052,
      ]);
    });
  });

  describe('isOpen function', () => {
    it('stub', () => {});
  });
});
