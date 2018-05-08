import './Search.css';
import React, { Component } from 'react';
import { Favorite } from '../Favorite/Favorite';
import { API } from '../../utils/api';

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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.city != prevState.city) {
      return {
        city: nextProps.city,
      };
    }
    return null;
  }

  componentDidMount() {
    document.querySelector('.search__form').value = this.state.value;
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
        const url = `?lat=${result.geometry.location.lat}&lng=${
          result.geometry.location.lng
        }`;
        this.props.setCity(result.formatted_address);
        window.location.hash = url;
      });
    }
    if (!cityName) {
      city.classList.add('search__input--invalid');
    }
  }

  handleChange(ev) {
    this.setState({ city: ev.target.value });
  }

  render() {
    return (
      <div className="search">
        <form className="search__form" onSubmit={this.handleSubmit}>
          <input
            className="search__input"
            type="text"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            value={this.state.city || ''}
          />
          <input className="search__button" type="submit" value="Search" />
        </form>
        <Favorite currentCity={this.state.city} setCity={this.props.setCity} />
      </div>
    );
  }
}
