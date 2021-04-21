import Leaflet, { latLng } from 'leaflet';
import './leaflet.css';

export const positionMarker = Leaflet.divIcon({
  className: 'current-position-icon',
});

export const initMap = (className, coords, zoom) => {
  const mapInstance = Leaflet.map(className).setView(coords, zoom);
  const mapBoxToken =
    'pk.eyJ1IjoiYmV6ZG9uYXMiLCJhIjoiY2tucmQ4cnN1MG5uejJucXdvb2J2b2o2dSJ9.pwHaMSlWgLr9zQAZzTb3Pw';

  Leaflet.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',
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

export const addStationToMap = (mapInstance, station) => {
  const markerOpacity = station.fillPercentage / 2 + 0.5; // 0 -- 1 -> 0.5 -- 1
  const marker = addMarkerToMap(mapInstance, station.coordinates, {
    opacity: markerOpacity,
  });
  marker.bindPopup(
    `<h4>${station.name}</h4>
    <b>Bikes:</b> ${station.totalBikes}<br>
    <b>Docks:</b> ${station.docks}`
  );
  return marker;
};

export const addCurrentPosToMap = (mapInstance, latLng) => {
  return addMarkerToMap(mapInstance, latLng, {
    icon: positionMarker,
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
