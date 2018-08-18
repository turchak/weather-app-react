import React, { Component } from 'react';
import './App.css';
import { Search } from './components/Search/Search';
import { Current } from './components/Current/Current';
import { Daily } from './components/Daily/Daily';
import { API } from './utils/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: 'M',
      days: 5,
      current: null,
      daily: null,
      city: null,
    };
    this.getWeather = this.getWeather.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.setCity = this.setCity.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () =>
      this.handleUrlChange(this.path)
    );

    if (this.path.length === 0) {
      return;
    }
    this.getWeather(this.path);
  }

  get path() {
    return window.location.hash.slice(1);
  }

  handleUrlChange(url) {
    this.getWeather(url);
  }

  setCity(name) {
    this.setState({ city: name });
  }

  getWeather(url) {
    const param = new URLSearchParams(url);
    const lat = param.get('lat');
    const lng = param.get('lng');

    const currentWeather = {
      units: this.state.units,
      lat: lat,
      lng: lng,
    };
    const dailyWeather = {
      units: this.state.units,
      lat: lat,
      lng: lng,
      days: this.state.days,
    };

    Promise.all([
      API.getCurrent(currentWeather),
      API.getWeek(dailyWeather),
    ]).then(res => {
      const current = res[0].data[0];
      const week = res[1].data;
      this.setState({
        current: {
          cityName: current.city_name,
          summary: current.weather.description,
          windSpd: current.wind_spd,
          humidity: current.rh,
          pressure: current.pres,
          temp: current.temp,
          icon: current.weather.icon,
        },
        daily: week,
      });

      if (!this.state.city) {
        this.setState({ city: current.city_name });
      }
    });
  }

  render() {
    if (!!this.state.current && !!this.state.daily) {
      return (
        <div className="app">
          <Search setCity={this.setCity} city={this.state.city} />
          <Current data={this.state.current} />
          <Daily data={this.state.daily} />
        </div>
      );
    }

    return (
      <div className="app">
        <Search setCity={this.setCity} city={this.state.city} />
      </div>
    );
  }
}

export default App;
