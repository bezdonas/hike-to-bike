import Leaflet, { latLng } from 'leaflet';
import './leaflet.css';

export const initMap = (className, coords, zoom) => {
  const mapInstance = Leaflet.map(className).setView(coords, zoom);
  const mapBoxToken =
    'pk.eyJ1IjoiYmV6ZG9uYXMiLCJhIjoiY2o3YWMxNmllMGRuOTM4bjB3MmVzYjNxdiJ9.MwmKortGU2xNM6LM4kTpjg';
  Leaflet.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    {
      attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">
                    OpenStreetMap</a> contributors, 
                    <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
                    Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapBoxToken,
    }
  ).addTo(mapInstance);

  return mapInstance;
};

export const mapPanTo = (mapInstance, coords) => {
  mapInstance.panTo(coords);
};

export const addMarkerToMap = (mapInstance, latLng, markerOptions) => {
  const marker = Leaflet.marker(latLng, markerOptions);
  marker.addTo(mapInstance);
  return marker;
};

export const addCurrentPosToMap = (mapInstance, latLng) => {
  return addMarkerToMap(mapInstance, latLng, {
    icon: Leaflet.divIcon({ className: 'current-position-icon' }),
  });
};

export const removeMarker = marker => {
  marker.remove();
};

export const distanceBetweenTwoStations = (coords1, coords2) => {
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
