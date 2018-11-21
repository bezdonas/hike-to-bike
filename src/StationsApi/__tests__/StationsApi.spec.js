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
          // address: '1401 John F. Kennedy Blvd.',
          // bikes: 22,
          // classicBikes: 22,
          // closeTime: '23:58:00',
          coordinates: [39.95378, -75.16374],
          // docks: 7,
          // electricBikes: 0,
          // name: '1401 John F. Kennedy Blvd.',
          // openTime: '00:02:00',
          // smartBikes: 0,
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
          // address: '328 S. 11th St.',
          // bikes: 13,
          // classicBikes: 13,
          // closeTime: '23:58:00',
          coordinates: [39.94517, -75.15993],
          // docks: 2,
          // electricBikes: 0,
          // name: '328 S. 11th St.',
          // openTime: '00:02:00',
          // smartBikes: 0,
        },
        {
          id: 3101,
          // address: '1015 South Street',
          // bikes: 11,
          // classicBikes: 11,
          // closeTime: '23:58:00',
          coordinates: [39.94295, -75.15955],
          // docks: 7,
          // electricBikes: 0,
          // name: '1015 South Street',
          // openTime: '00:02:00',
          // smartBikes: 0,
        },
        {
          id: 3052,
          // address: '923 Locust St.',
          // bikes: 15,
          // classicBikes: 15,
          // closeTime: '23:58:00',
          coordinates: [39.94732, -75.15695],
          // docks: 10,
          // electricBikes: 0,
          // name: '923 Locust St.',
          // openTime: '00:02:00',
          // smartBikes: 0,
        },
      ]);
    });
  });
});
