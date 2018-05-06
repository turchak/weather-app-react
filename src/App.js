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
    };
    this.weather = this.weather.bind(this);
  }
  componentDidMount() {}

  weather(coordinates) {
    const lat = coordinates.geometry.location.lat;
    const lng = coordinates.geometry.location.lng;
    console.log(this.state);
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
    });
  }

  render() {
    if (!!this.state.current & !!this.state.daily) {
      return (
        <div className="app">
          <Search submit={this.weather} />
          <Current data={this.state.current} />
          <Daily data={this.state.daily} />
        </div>
      );
    }

    return (
      <div className="app">
        <Search submit={this.weather} />
      </div>
    );
  }
}

export default App;
