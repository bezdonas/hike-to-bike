import axios from 'axios';
import { distanceBetweenTwoPoints } from '../MapAdapter/LeafletAdapter.js';
import { get } from 'lodash';

const endpoint = 'https://www.rideindego.com/stations/json/';

export const getStationsPromise = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then(response => {
        resolve(parsePoints(get(response, 'data.features')));
      })
      .catch(error => {
        alert(`Indego's API doesn't work :(
               Look into console for details`);
        console.error(error);
        reject();
      });
  });
};

// indego API's coords are flipped ([lng, lat], instead of [lat,lng])
export const flipCoords = coords => [coords[1], coords[0]];

// look RawPoints.js and ParsedPoints.js in ../__mocks__/ for example of input -> output
export const parsePoints = rawPoints => {
  const parsedPoints = [];
  rawPoints.forEach(rawPoint => {
    const { geometry, properties } = rawPoint;
    parsedPoints.push({
      id: properties.kioskId,
      coordinates: flipCoords(geometry.coordinates),
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
export const getClosestPoints = (coords, points, quantity = 3) => {
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
