import React, { Component } from "react";
import './MenuFixed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/fontawesome-free-solid';

export default class MenuFixedDesktop extends Component {

  render() {
    return (
      <div className="menu_bot_right">
        <div>{this.props.likes} <FontAwesomeIcon icon={faHeart}/></div>  
        <div>{this.props.price}€ / jour</div>
      </div>
    );
  }
}
