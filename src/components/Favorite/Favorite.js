import './Favorite.css';
import React, { Component } from 'react';
import { OffCanvas } from '../OffCanvas/OffCanvas';

export class Favorite extends Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
    this.state = {
      list: this.getList() || [],
      city: null,
      valid: false,
    };
  }

  getList() {
    const list = JSON.parse(window.localStorage.getItem('favorites'));
    return list;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      city: nextProps.currentCity,
      valid: prevState.city ? true : false,
    };
  }

  setList(city) {
    if (!city) {
      return;
    }
    const list = this.state.list;
    if (list.includes(city)) {
      return;
    } else {
      list.push(city);
      const listString = JSON.stringify(list);
      window.localStorage.setItem('favorites', listString);
      this.setState({ list });
    }
  }

  deleteCity(city) {
    const list = this.getList();
    if (list.includes(city)) {
      let i = list.indexOf(city);
      if (i !== -1) {
        list.splice(i, 1);
      }
      this.handleClear();
      const listString = JSON.stringify(list);
      window.localStorage.setItem('favorites', listString);
      this.setState({ list });
    }
  }

  handleClear() {
    window.localStorage.removeItem('favorites');
    this.setState({ list: [] });
  }

  handleClick() {
    this.setList(this.state.city);
  }

  render() {
    return (
      <div>
        <OffCanvas
          list={this.state.list}
          clear={this.handleClear}
          setCity={this.props.setCity}
          deleteCity={this.deleteCity}
        />

        <div className="favorite">
          {this.state.valid ? (
            <button
              className="favorite__button favorite__button--add"
              onClick={this.handleClick}
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
