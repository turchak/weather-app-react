import './OffCanvas.css';
import React, { Component } from 'react';
import { API } from '../../utils/api';

export class OffCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      count: null,
    };
  }

  componentDidMount() {
    this.handleOpen();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const countList = nextProps.list;
    const amount = Array.from(countList).length;
    return {
      count: amount,
    };
  }

  handleOpen() {
    const host = document.querySelector('#root');
    host.addEventListener('click', this.handleClick);
  }

  handleClick(ev) {
    const elemClass = ev.target.classList;
    const sidebar = document.querySelector('.menu__sidebar');
    const background = document.querySelector('.menu__background');
    const open = document.querySelector('.menu__button--open');
    if (
      elemClass.contains('menu__button--close') ||
      elemClass.contains('menu__background--opened')
    ) {
      sidebar.classList.remove('menu__sidebar--opened');
      background.classList.remove('menu__background--opened');
      open.hidden = false;
    }

    if (elemClass.contains('menu__button--open')) {
      open.hidden = true;
      sidebar.classList.add('menu__sidebar--opened');
      background.classList.add('menu__background--opened');
    }

    if (elemClass.contains('menu__sidebar-item-name')) {
      const cityName = ev.target.innerText;
      API.getCoordinates(cityName).then(result => {
        const url = `?lat=${result.geometry.location.lat}&lng=${
          result.geometry.location.lng
        }`;
        window.location.hash = url;
        this.props.setCity(cityName);
      });
    }

    if (elemClass.contains('menu__button--delete')) {
      const cityName = ev.target.dataset.delete;
      this.props.deleteCity(cityName);
    }
  }

  setCoordinates(city) {
    API.getCoordinates(city).then(result => {
      return `?lat=${result.geometry.location.lat}&lng=${
        result.geometry.location.lng
      }`;
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="menu">
        <button className="menu__button menu__button--open">
          {this.state.count >= 1 ? (
            [...Array(this.state.count)].map((e, i) => (
              <i
                key={i}
                className="fa fa-star menu__button-icon menu__button-icon--gold"
                aria-hidden="true"
              />
            ))
          ) : (
            <i className="fa fa-star menu__button-icon" aria-hidden="true" />
          )}
        </button>
        <div className="menu__sidebar">
          <ul className="menu__sidebar-items">
            {this.props.list.map((elem, index) => {
              return (
                <li key={index} className="menu__sidebar-item">
                  <span className="menu__sidebar-item-name">{elem}</span>
                  <button
                    className="menu__button menu__button--delete"
                    data-delete={elem}
                  />
                </li>
              );
            })}
          </ul>
          <button
            className="menu__button menu__button--clear"
            onClick={this.props.clear}
          >
            <i className="fa fa-trash" aria-hidden="true" />
          </button>
          <button className="menu__button menu__button--close">
            <i
              className="fa fa-times-circle menu__button-icon"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="menu__background" />
      </div>
    );
  }
}
