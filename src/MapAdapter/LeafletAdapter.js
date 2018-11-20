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

export const mapPanTo = (mapInstance, coords) => {
  mapInstance.panTo(coords);
};

export const addMarkerToMap = (
  mapInstance,
  latLng,
  markerOptions = { opacity: 0.25 }
) => {
  const marker = Leaflet.marker(latLng, markerOptions);
  marker.addTo(mapInstance);
  return marker;
};

export const highlightMarker = marker => {
  marker.setOpacity(1);
};

export const addCurrentPosToMap = (mapInstance, latLng) => {
  const circle = Leaflet.circle(latLng, {
    color: 'white',
    fillColor: '#4285F4',
    fillOpacity: 1,
    radius: 30,
  });
  circle.addTo(mapInstance);
  return circle;
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
