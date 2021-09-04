import './Photographer.css';
import '../App.css';
import React from 'react';
import TagsCard from "./../Home/TagsCard";
import { useParams } from 'react-router-dom';
let json = require('./../data.json');

export default function Photographer() {
  const { id } = useParams();
  var tags = [];
  const media = json.media.filter(m => m.photographerId.toString() === id);
  const photographer = json.photographers.filter(p => p.id.toString() === id);
  for (const tag of photographer[0].tags) {
    tags.push(<div key={tag.toString()}>{TagsCard(tag)}</div>);
  }
  return (
    <div className="container">
      <a className="icon" href="/">FishEye</a>
      <div className="Jumbotron">
        <div className="card">
          <div className="card-body">
            <div className="user__name">{photographer[0].name}</div>
            <div className="user__address">{photographer[0].city}, {photographer[0].country}</div>
            <div>{photographer[0].tagline}</div>
            <div className="user__tags">{tags}</div>
          </div>
          <div className="card-middle">
            <div className="card-buttom">
              Contactez-moi
            </div>
          </div>
          <div className="card-pic">
            <img className="image-cropper" src={process.env.PUBLIC_URL + "/assets/Photographers/" + photographer[0].portrait} alt={photographer[0].portrait} />
          </div>
        </div>
      </div>
      {/* TODO : Menu déroulant à faire */}
      <p>Trier par</p>
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link" href="#">Popularité</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Date</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Titre</a>
          </li>
        </ul>
      </nav>
      {/* TODO : Faire le filtre suivant le choix de l'acteur */}
      <div className="media">
        {media.map(m => <img className="image-cropper" key={m.id} src={process.env.PUBLIC_URL + "/assets/" + photographer[0].name + "/" + m.image} alt={m.title} />)}
      </div>
    </div>
  );
}
