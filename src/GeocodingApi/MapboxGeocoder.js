import axios from 'axios';
import get from 'lodash/get';
import debounce from 'lodash/debounce';

const mapBoxToken =
  'pk.eyJ1IjoiYmV6ZG9uYXMiLCJhIjoiY2o3YWMxNmllMGRuOTM4bjB3MmVzYjNxdiJ9.MwmKortGU2xNM6LM4kTpjg';
const philadelphiaBbox = '-75.309705,39.873659,-74.961275,40.128132';
const defaultSearchParams = {
  autocomplete: true,
  country: 'us',
  types: 'address',
  access_token: mapBoxToken,
  bbox: philadelphiaBbox,
};

export const geocodeAddress = (addressString, params = defaultSearchParams) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressString}.json`,
        {
          params,
        }
      )
      .then(response => {
        resolve(get(response, 'data.features'));
      })
      .catch(error => {
        alert(`Mapbox'es geocoding API doesn't work :(
             Look into console for details`);
        console.error(error);
        reject(error);
      });
  });
};
