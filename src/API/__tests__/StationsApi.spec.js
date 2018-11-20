import { parseStations, getClosestStations } from '../StationsApi.js';
import RawStations from '../__mocks__/RawStations.js';
import ParsedStations from '../__mocks__/ParsedStations.js';
import cloneDeep from 'lodash';

describe('StationsApi', () => {
  describe('parseStations function', () => {
    it('should parse RawStations into ParsedStations', () => {
      const rawStations = cloneDeep(RawStations);
      const parsedStations = cloneDeep(ParsedStations);
      expect(cloneDeep(parseStations(rawStations))).toEqual(parsedStations);
    });
  });

  describe('getClosestStations function', () => {
    it('should return ids[] of closest ${quantity} stations to passed coords', () => {
      const parsedStations = cloneDeep(ParsedStations);
      expect(
        getClosestStations([39.95378, -75.16374], parsedStations, 1)
      ).toEqual([3004]);
      expect(
        getClosestStations([39.94517, -75.15993], parsedStations, 3)
      ).toEqual([3007, 3101, 3052]);
    });
  });

  describe('isOpen function', () => {
    it('stub', () => {});
  });
});
