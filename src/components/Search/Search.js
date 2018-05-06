import './Search.css';
import { API } from '../../utils/api';
import React, { Component } from 'react';
import { Favorite } from '../Favorite/Favorite';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = {
      city: null,
    };
  }

  componentDidMount() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    const input = document.querySelector('.search__input');
    const options = {
      types: ['(cities)'],
    };
    return new window.google.maps.places.Autocomplete(input, options);
  }

  handleFocus(ev) {
    if (
      !ev.target.classList.contains('search__input') ||
      ev.target.classList.contains('search__input--invalid')
    ) {
      ev.target.classList.toggle('search__input--invalid');
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const city = document.querySelector('.search__input');
    const cityName = city.value.trim();
    if (cityName) {
      API.getCoordinates(cityName).then(result => {
        this.props.submit(result);
        this.setState({ city: cityName });
        console.log(this.state);
      });
    }
    if (!cityName) {
      console.log('invalid');
      city.classList.add('search__input--invalid');
    }
  }

  handleChange() {}

  render() {
    return (
      <div className="search">
        <form className="search__form" onSubmit={this.handleSubmit}>
          <input
            className="search__input"
            type="text"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
          <input className="search__button" type="submit" value="Search" />
        </form>
        <Favorite currentCity={this.state.city} />
      </div>
    );
  }
}
