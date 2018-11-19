import Leaflet from 'leaflet';

export const initMap = (className, coords, zoom) => {
  // document.head.innerHTML += `<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
  //       integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
  //       crossorigin=""/>`;
  const mapInstance = Leaflet.map(className).setView(coords, zoom);

  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInstance);

  return mapInstance;
};
