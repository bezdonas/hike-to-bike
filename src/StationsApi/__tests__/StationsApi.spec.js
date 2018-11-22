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
    it('should return ids[] of closest ${quantity} stations to passed coords 1', () => {
      const parsedStations = cloneDeep(ParsedStations);
      expect(
        getClosestStations([39.95378, -75.16374], parsedStations, 1)
      ).toEqual([
        {
          id: 3004,
          totalBikes: 22,
          coordinates: [39.95378, -75.16374],
          docks: 7,
          name: '1401 John F. Kennedy Blvd.',
          fillPercentage: 0.7333333333333333,
        },
      ]);
    });
    it('should return ids[] of closest ${quantity} stations to passed coords 2', () => {
      const parsedStations = cloneDeep(ParsedStations);
      expect(
        getClosestStations([39.94517, -75.15993], parsedStations, 3)
      ).toEqual([
        {
          id: 3007,
          totalBikes: 13,
          coordinates: [39.94517, -75.15993],
          docks: 2,
          name: '328 S. 11th St.',
          fillPercentage: 0.43333333333333335,
        },
        {
          id: 3101,
          totalBikes: 11,
          coordinates: [39.94295, -75.15955],
          docks: 7,
          name: '1015 South Street',
          fillPercentage: 0.36666666666666664,
        },
        {
          id: 3052,
          totalBikes: 15,
          coordinates: [39.94732, -75.15695],
          docks: 10,
          name: '923 Locust St.',
          fillPercentage: 0.5,
        },
      ]);
    });
  });
});
