import React, { Component } from 'react';
import './App.css';
import { Search } from './components/Search/Search';

class App extends Component {
  componentDidMount() {}

  weather(coordinates) {
    const lat = coordinates.geometry.location.lat;
    const lng = coordinates.geometry.location.lng;
    console.log(lat, lng);
  }

  render() {
    return (
      <div className="app">
        <Search submit={this.weather} />
      </div>
    );
  }
}

export default App;
