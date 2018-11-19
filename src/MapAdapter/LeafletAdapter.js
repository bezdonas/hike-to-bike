import Leaflet, { latLng } from 'leaflet';
import './leaflet.css';

export const initMap = (className, coords, zoom) => {
  const mapInstance = Leaflet.map(className).setView(coords, zoom);

  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInstance);

  return mapInstance;
};

export const addMarkerToMap = (mapInstance, latLng, markerOptions) => {
  const marker = Leaflet.marker(latLng, markerOptions);
  marker.addTo(mapInstance);
  return marker;
};

export const distanceBetweenTwoPoints = (coords1, coords2) => {
  return Leaflet.CRS.Simple.distance(
    {
      lat: coords1[0],
      lng: coords1[1],
    },
    {
      lat: coords2[0],
      lng: coords2[1],
    }
  );
};
