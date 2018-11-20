import axios from 'axios';
import { distanceBetweenTwoStations } from '../MapAdapter/LeafletAdapter.js';
import { get } from 'lodash';

const endpoint = 'https://www.rideindego.com/stations/json/';

export const getStationsPromise = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then(response => {
        resolve(parseStations(get(response, 'data.features')));
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

// look RawStations.js and ParsedStations.js in ../__mocks__/ for example of input -> output
export const parseStations = rawStations => {
  const parsedStations = [];
  rawStations.forEach(rawPoint => {
    const { geometry, properties } = rawPoint;
    parsedStations.push({
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
  return parsedStations;
};

// Takes current coords, parsed stations and quantity of required stations
// returns the ${quanitity} of closest stations
export const getClosestStations = (coords, stations, quantity = 3) => {
  const pointProximityAndId = [];
  stations.forEach(point => {
    const proximity = distanceBetweenTwoStations(coords, point.coordinates);
    pointProximityAndId.push({
      id: point.id,
      proximity,
    });
  });

  // Closest go first
  pointProximityAndId.sort((a, b) => a.proximity - b.proximity);
  const slicedClosestStations = pointProximityAndId.slice(0, quantity);

  return slicedClosestStations.map(point => point.id);
};

export const isOpen = kioskId => {};
