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

  get path() {
    return window.location.hash.slice(1);
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

  handleUrlChange(url) {
    this.getWeather(url);
  }

  setCity(name) {
    this.setState({ city: name });
  }

  getWeather(url) {
    const { units, days } = this.state;
    const param = new URLSearchParams(url);
    const lat = param.get('lat');
    const lng = param.get('lng');

    const currentWeather = {
      lat: lat,
      lng: lng,
      units,
    };
    const dailyWeather = {
      lat: lat,
      lng: lng,
      days,
      units,
    };

    Promise.all([
      API.getCurrent(currentWeather),
      API.getWeek(dailyWeather),
    ]).then(res => {
      console.log(res);
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
    const { current, daily, city } = this.state;
    // if (!!current && !!daily) {
    //   return (
    //     <div className="app">
    //       <Search setCity={this.setCity} city={city} />
    //       <Current data={current} />
    //       <Daily data={daily} />
    //     </div>
    //   );
    // }

    return (
      <div className="app">
        <Search setCity={this.setCity} city={city} />
        {current ? <Current data={current} /> : null}
        {daily ? <Daily data={daily} />: null}
      </div>
    );
  }
}

export default App;
