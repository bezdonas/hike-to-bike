import {
  initMap,
  addMarkerToMap,
  addStationToMap,
  distanceBetweenTwoStations,
} from '../LeafletAdapter.js';

describe('Leaflet', () => {
  const mapId = 'mapNodeId';
  beforeEach(() => {
    const mapNode = document.createElement('div');
    mapNode.id = mapId;
    document.body.appendChild(mapNode);
  });

  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  describe('initMap function', () => {
    it('inits map with set coords and zoom 1', () => {
      const coords = [51.505, -0.09];
      const zoom = 13;
      const mapInstance = initMap(mapId, coords, zoom);

      expect(mapInstance.getCenter().lat).toEqual(coords[0]);
      expect(mapInstance.getCenter().lng).toEqual(coords[1]);
      expect(mapInstance.getZoom()).toEqual(zoom);
    });

    it('inits map with set coords and zoom 2', () => {
      const coords = [54.505, 4.09];
      const zoom = 10;
      const mapInstance = initMap(mapId, coords, zoom);

      expect(mapInstance.getCenter().lat).toEqual(coords[0]);
      expect(mapInstance.getCenter().lng).toEqual(coords[1]);
      expect(mapInstance.getZoom()).toEqual(zoom);
    });
  });

  describe('addMarkerToMap function', () => {
    it('Adds marker to map with said latLng', () => {
      const mapInstance = initMap(mapId, [54.505, -0.09], 13);

      const markerInstance = addMarkerToMap(mapInstance, [55.0, 13.23]);
      expect(markerInstance.getLatLng()).toEqual({
        lat: 55.0,
        lng: 13.23,
      });
      expect(mapInstance.hasLayer(markerInstance));
    });

    it('Adds marker to map with said options', () => {
      const mapInstance = initMap(mapId, [54.505, -0.09], 13);
      const title = 'foo and bar are friends';
      const markerInstance = addMarkerToMap(mapInstance, [55.0, 13.23], {
        title,
      });
      expect(markerInstance.getElement().title).toEqual(title);
      expect(mapInstance.hasLayer(markerInstance));
    });
  });
  describe('distanceBetweenTwoStations', () => {
    it('counts distance correctly', () => {
      expect(distanceBetweenTwoStations([5, 6], [32, 33])).toEqual(
        38.18376618407357
      );
      expect(distanceBetweenTwoStations([56, 43], [12, 32])).toEqual(
        45.35416188179427
      );
      expect(distanceBetweenTwoStations([13, 22], [13, 55])).toEqual(33);
    });
  });

  describe('addStationToMap', () => {
    it('adds marker with popup', () => {
      const mapInstance = initMap(mapId, [54.505, -0.09], 13);
      const markerInstance = addStationToMap(mapInstance, {
        id: 3005,
        coordinates: [39.94733, -75.14403],
        name: '191 S. 2nd St.',
        totalBikes: 11,
        fillPercentage: 0.36666666666666664,
        docks: 2,
      });
      expect(markerInstance.getLatLng()).toEqual({
        lat: 39.94733,
        lng: -75.14403,
      });
      expect(markerInstance.getPopup().getContent()).toEqual(
        `<h4>191 S. 2nd St.</h4>
    <b>Bikes:</b> 11<br>
    <b>Docks:</b> 2`
      );
      expect(mapInstance.hasLayer(markerInstance));
    });
  });
});
