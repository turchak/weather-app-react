import './Favorite.css';
import React, { Component } from 'react';
import { OffCanvas } from '../OffCanvas/OffCanvas';

export class Favorite extends Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      list: this.getList() || [],
      city: null,
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  getList() {
    const list = JSON.parse(window.localStorage.getItem('favorites'));
    return list;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      city: nextProps.currentCity,
    };
  }

  // componentWillReceiveProps() {
  //   console.log('will');
  //   this.setState({ city: this.props.currentCity });
  // }

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

  handleClear() {
    window.localStorage.removeItem('favorites');
    this.setState({ list: [] });
  }

  handleClick() {
    console.log(this.state);
    this.setList(this.state.city);
  }

  render() {
    return (
      <div>
        <OffCanvas list={this.state.list} clear={this.handleClear} />
        <div className="favorite">
          <button className="favorite__button favorite__button--add" onClick={this.handleClick}>
            <i className="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}
