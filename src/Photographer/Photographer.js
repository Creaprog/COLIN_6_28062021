import './Photographer.css';
import './../Home/Home.css';
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
  console.log(tags);
  return (
    <>
      <a className="icon" href="/">FishEye</a>
      <div className="Jumbotron">
        <div className="card">
          <h2 className="user__name">{photographer[0].name}</h2>
          <div className="user__address">{photographer[0].city}, {photographer[0].country}</div>
          <div>{photographer[0].tagline}</div>
          <div className="user__tags">{tags}</div>
        </div>
      </div>
      <h1>value : {id}</h1>
    </>
  );
}
