import { createClient } from '@google/maps';

class Api {
  constructor() {
    this.googleMapsClient = createClient({
      key: 'AIzaSyD3LTkgH_ASYBXH-63RyoCNnklwXscJVek',
      language: 'en',
      Promise: Promise,
    });
    this.weatherApiKey = '5499a420699d421297f7f99e774cfc94';
  }

  placesAutocomplete() {
    return new Promise(resolve => {
      const results = this.googleMapsClient
        .placesAutoComplete({
          input: 'kiev',
        })
        .asPromise()
        .then(response => {
          return response;
        });
      return resolve(results);
    });
  }

  getCoordinates(city) {
    return new Promise(resolve => {
      const results = this.googleMapsClient
        .geocode({
          address: city,
        })
        .asPromise()
        .then(response => {
          return response.json.results[0];
        });
      return resolve(results);
    });
  }
}

export const API = new Api();
