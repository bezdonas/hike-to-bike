import axios from 'axios';
import { distanceBetweenTwoStations } from '../MapAdapter/LeafletAdapter.js';
import get from 'lodash/get';
import map from 'lodash/map';
import forEach from 'lodash/forEach';

const endpoint = 'https://kiosks.bicycletransit.workers.dev/phl';

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
        reject(error);
      });
  });
};

// indego API's coords are flipped in relation to leaflet
export const flipCoords = coords => [coords[1], coords[0]];

// look RawStations.js and ParsedStations.js in ../__mocks__/ for example of input -> output
export const parseStations = rawStations => {
  const maxBikesPerStation = 30;
  const parsedStations = [];
  rawStations.forEach(rawPoint => {
    const { geometry, properties } = rawPoint;
    if (properties.bikesAvailable === 0) {
      return;
    }
    parsedStations.push({
      id: get(properties, 'kioskId'),
      coordinates: flipCoords(get(geometry, 'coordinates')),
      name: get(properties, 'addressStreet'),
      totalBikes: get(properties, 'bikesAvailable'),
      fillPercentage: get(properties, 'bikesAvailable') / maxBikesPerStation,
      docks: get(properties, 'docksAvailable'),
    });
  });
  return parsedStations;
};

// Takes current coords, parsed stations and quantity of required stations
// returns the ${quanitity} of closest stations
export const getClosestStations = (coords, stations, quantity = 3) => {
  const stationProximityAndId = [];
  stations.forEach(station => {
    const proximity = distanceBetweenTwoStations(coords, station.coordinates);
    stationProximityAndId.push({
      proximity,
      ...station,
    });
  });

  // Closest go first
  stationProximityAndId.sort((a, b) => a.proximity - b.proximity);

  const slicedClosestStations = stationProximityAndId.slice(0, quantity);
  slicedClosestStations.forEach(closestStation => {
    delete closestStation.proximity;
  });

  return slicedClosestStations;
};

export const isOpen = kioskId => {};
