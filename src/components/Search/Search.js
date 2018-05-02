import './Search.css';
import { API } from '../../utils/api';
import React, { Component } from 'react';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(ev) {
    ev.preventDefault();
    const city = document.querySelector('.search__input').value.trim();
    API.getCoordinates(city).then(result => console.log(result));
  }

  handleChange() {}

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <input className="search__input" type="text" onChange={this.handleChange} />
        <input className="search__button" type="submit" value="Submit" />
      </form>
    );
  }
}
