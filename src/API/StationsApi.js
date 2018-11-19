import axios from 'axios';

const endpoint = '//www.rideindego.com/stations/json/';

export const getPromise = () => {};

export const parsePoints = rawPoints => {
  const parsedPoints = {};
  rawPoints.forEach(rawPoint => {
    const { geometry, properties } = rawPoint;
    parsedPoints[properties.kioskId] = {
      coordinates: geometry.coordinates,
      address: properties.addressStreet,
      bikes: properties.bikesAvailable,
      classicBikes: properties.classicBikesAvailable,
      smartBikes: properties.smartBikesAvailable,
      electricBikes: properties.electricBikesAvailable,
      docks: properties.docksAvailable,
      closeTime: properties.closeTime,
      openTime: properties.openTime,
    };
  });
  return parsedPoints;
};

export const getClosestPoints = (coords, quantity) => {};
