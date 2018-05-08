import './Daily.css';
import React, { Component } from 'react';
import { convertIcon } from '../../utils/icon';
import { convertDate } from '../../utils/day';

export class Daily extends Component {
  componentDidMount() {
    this.setIcon();
  }

  setIcon() {
    const icons = document.querySelectorAll('.day__icon');
    const currentIcon = convertIcon(this.props.data.icon);
    icons.forEach(icon => {
      icon.className = `day__icon ${currentIcon}`;
    });
  }

  render() {
    return (
      <div className="daily">
        <ul className="days">
          {this.props.data.map((elem, index) => {
            return (
              <li key={index} className="day">
                <p className="day__time">{convertDate(elem.ts)}</p>
                <p className="day__temp">
                  <span className="day__temp-value">
                    {elem.min_temp}
                    <span className="day__temp-units">c</span>
                  </span>
                  <span className="day__temp-value">
                    {elem.max_temp}
                    <span className="day__temp-units">c</span>
                  </span>
                </p>
                <i className="day__icon" />
                <p className="day__description">{elem.weather.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
