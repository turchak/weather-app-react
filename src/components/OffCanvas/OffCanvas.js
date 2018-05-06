import './OffCanvas.css';
import React, { Component } from 'react';

export class OffCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleOpen();
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
  }

  render() {
    return (
      <div className="menu">
        <button className="menu__button menu__button--open">
          <i className="fa fa-star menu__button-icon" aria-hidden="true" />
        </button>
        <div className="menu__sidebar">
          <ul className="menu__sidebar-items">
            <li className="menu__sidebar-item">
              <span className="menu__sidebar-item-link">{this.props.list}</span>
            </li>
          </ul>
          <button className="menu__button menu__button--clear" onClick={this.props.clear}>
            <i className="fa fa-trash" aria-hidden="true" />
          </button>
          <button className="menu__button menu__button--close">
            <i className="fa fa-times-circle menu__button-icon" aria-hidden="true" />
          </button>
        </div>
        <div className="menu__background" />
      </div>
    );
  }
}
