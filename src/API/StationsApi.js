import axios from 'axios';
import { distanceBetweenTwoPoints } from '../MapAdapter/LeafletAdapter.js';

const endpoint = '//www.rideindego.com/stations/json/';

export const getPromise = () => {
  return axios.get('//www.rideindego.com/stations/json/');
};

// look RawPoints.js and ParsedPoints.js in ../__mocks__/ for example of input -> output
export const parsePoints = rawPoints => {
  const parsedPoints = [];
  rawPoints.forEach(rawPoint => {
    const { geometry, properties } = rawPoint;
    parsedPoints.push({
      id: properties.kioskId,
      // thanks, indego!
      coordinates: [geometry.coordinates[1], geometry.coordinates[0]],
      name: properties.addressStreet,
      address: properties.addressStreet,
      bikes: properties.bikesAvailable,
      classicBikes: properties.classicBikesAvailable,
      smartBikes: properties.smartBikesAvailable,
      electricBikes: properties.electricBikesAvailable,
      docks: properties.docksAvailable,
      closeTime: properties.closeTime,
      openTime: properties.openTime,
    });
  });
  return parsedPoints;
};

// Takes current coords, parsed points and quantity of required points
// returns the ${quanitity} of closest points
export const getClosestPoints = (coords, points, quantity) => {
  const pointProximityAndId = [];
  points.forEach(point => {
    const proximity = distanceBetweenTwoPoints(coords, point.coordinates);
    pointProximityAndId.push({
      id: point.id,
      proximity,
    });
  });

  // Closest go first
  pointProximityAndId.sort((a, b) => a.proximity - b.proximity);
  const slicedClosestPoints = pointProximityAndId.slice(0, quantity);

  return slicedClosestPoints.map(point => point.id);
};

export const isOpen = kioskId => {};
