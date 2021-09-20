import React, { Component } from "react";
import './MenuFixed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/fontawesome-free-solid';

export default class MenuFixedDesktop extends Component {

  // TODO: Mettre en place un props pour récupérer les valeurs
  render() {
    return (
      <div className="menu_bot_right">
        200 <FontAwesomeIcon icon={faHeart} />
      </div>
    );
  }
}
