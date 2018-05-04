import { createClient } from '@google/maps';

class Api {
  constructor() {
    this.googleMapsClient = createClient({
      key: 'AIzaSyD3LTkgH_ASYBXH-63RyoCNnklwXscJVek',
      language: 'en',
      Promise: Promise,
    });
    this.weatherClient = {
      key: '5499a420699d421297f7f99e774cfc94',
      url: {
        current: 'https://api.weatherbit.io/v2.0/current',
        daily: 'https://api.weatherbit.io/v2.0/forecast/daily',
      },
    };
  }

  getCurrent(data) {
    const { units, lat, lng } = data;
    return new Promise(resolve => {
      const url = this.weatherClient.url.current + '?lat=' + lat + '&lon=' + lng + '&key=' + this.weatherClient.key + '&units=' + units;
      fetch(url).then(response => {
        return resolve(response.json());
      });
    });
  }

  getWeek(data) {
    const { units, lat, lng, days } = data;
    return new Promise(resolve => {
      const url = this.weatherClient.url.daily + '?lat=' + lat + '&lon=' + lng + '&key=' + this.weatherClient.key + '&units=' + units + '&days=' + days;
      fetch(url).then(response => {
        return resolve(response.json());
      });
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
