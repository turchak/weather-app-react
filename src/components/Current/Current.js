import './Current.css';
import React, { Component } from 'react';
import { convertIcon } from '../../utils/icon';

export class Current extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setIcon();
  }

  setIcon() {
    const iconElem = document.querySelector('.current__summary-item--icon');
    const currentIcon = convertIcon(this.props.data.icon);
    iconElem.className = `current__summary-item current__summary-item--icon ${currentIcon}`;
  }

  render() {
    return (
      <div className="current">
        <ul className="current__info">
          <li className="current__info-item">
            Wind: {this.props.data.windSpd.toFixed(1)}
            <span className="current__info-item-units current__info-item-units--wind">m/s</span>
          </li>
          <li className="current__info-item">
            Humidity: {this.props.data.humidity}
            <span className="current__info-item-units current__info-item-units--humidity">%</span>
          </li>
          <li className="current__info-item">
            Pressure: {this.props.data.pressure.toFixed(0)}
            <span className="current__info-item-units current__info-item-units--pressure">hPa</span>
          </li>
        </ul>
        <h1 className="current__title">{this.props.data.cityName}</h1>
        <p className="current__summary">
          <i className="current__summary-item current__summary-item--icon" />
          <span className="current__summary-item current__summary-item--temp">
            {this.props.data.temp}
            <span className="current__summary-item-units current__summary-item-units--temp">c</span>
          </span>
          <span className="current__summary-item current__summary-item--description">{this.props.data.summary}</span>
        </p>
      </div>
    );
  }
}
