import './Photographer.css';
import '../App.css';
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faHeart } from '@fortawesome/fontawesome-free-solid';
import MenuFixedDesktop from './MenuFixed.js';
import TagsCard from "./../Home/TagsCard";
import ModalCarousel from './ModalCarousel';
import ModalContact from './ModalContact';
import { Link } from "react-router-dom";

class Photographer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      filter: ['Popularité', 'Date', 'Titre'],
      media: [],
      photographers: [],
      tags: [],
      likes: 0,
      showCarousel: false,
      showContact: false,
      index: 0
    };
  }

  async call() {
    await axios.get("/data.json")
      .then(result => this.setState({
        media: result.data.media.filter(m => m.photographerId.toString() === this.props.match.params.id),
        photographers: result.data.photographers.filter(p => p.id.toString() === this.props.match.params.id)[0],
        likes: result.data.media.filter(m => m.photographerId.toString() === this.props.match.params.id).reduce((acc, cur) => acc + cur.likes, 0)
      }))
  }

  componentDidMount() {
    this.call()
      .then(() => this.createTagsCard(this.state.photographers.tags))
      .then(() => {this.modalCarousel()})
      .then(() => {this.modalContact()});
  }

  like(elem) {
    elem.likes++;
    this.setState({likes: this.state.likes + 1});
  }

  imageCard(media) {
    return (
      <div key={media.id}>
        <img tabIndex="0" onKeyDown={(e) => {
          if (e.key === "Enter") {
            this.setState({showCarousel: true, index: this.state.media.indexOf(media)})}
          }
        } 
             onClick={() => this.setState({showCarousel: true, index: this.state.media.indexOf(media)})} className="image-rectangle" src={process.env.PUBLIC_URL + "/assets/" + this.state.photographers.name + "/" + media.image} alt={media.title} />
        <div className="card-text">
          <div className="card-title">{media.title}</div>
          <button onClick={() => this.like(media)} className="heart">{media.likes} <FontAwesomeIcon icon={faHeart} /></button>
        </div>
      </div>
    );
  }

  videoCard(media) {
    return (
      <div key={media.id}>
        {/* TODO : Faire la même chose pour ici */}
        <video tabIndex="0" className="video-rectangle" autoPlay loop width="320" onClick={() => this.setState({showCarousel: true, index: this.state.media.indexOf(media)})}>
          <source src={process.env.PUBLIC_URL + "/assets/" + this.state.photographers.name + "/" + media.video} type="video/mp4" />
        </video>
        <div className="card-text">
          <div className="card-title">{media.title}</div>
          <button onClick={() => this.like(media)} className="heart">{media.likes} <FontAwesomeIcon icon={faHeart} /></button>
        </div>
      </div>
    )
  }

  sortAlpha(array) {
    return array.sort((a, b) => a.title.localeCompare(b.title));
  }

  sortDate(array) {
    return array.sort((a, b) => a.date.localeCompare(b.date));
  }

  sortPopularity(array) {
    return array.sort((a, b) => b.likes - a.likes);
  }

  displayCard(media) {
    return media.map(m => (m.image !== undefined) ?
                      (this.imageCard(m)) :
                      (this.videoCard(m))
    )
  }
  
  swap(array, elem) {
    var value = array[0];
    var position = array.indexOf(elem);
    array[0] = elem;
    array[position] = value;
    this.setState({filter : array});
    this.updateCard(elem);
  }

  updateCard(elem) {
    switch (elem) {
      default:
        break;
      case 'Titre':
        this.setState({media: this.sortAlpha(this.state.media)});
        break;
      case 'Date':
        this.setState({media: this.sortDate(this.state.media)});
        break;
      case 'Popularité':
        this.setState({media: this.sortPopularity(this.state.media)});
        break;
    }
  }

  createTagsCard(photographerTags) {
    var tags = [];
    for (const tag of photographerTags) {
      tags.push(<Link to={"/" + tag} key={tag.toString()}>{TagsCard(tag)}</Link>);
    }
    this.setState({tags: tags});
  }

  modalCarousel() {
    return (
      <ModalCarousel onClose={() => this.setState({showCarousel: false})} show={this.state.showCarousel} media={this.state.media} photographers={this.state.photographers} index={this.state.index} />
    )
  }

  modalContact() {
    return (
      <ModalContact onClose={() => this.setState({showContact: false})} show={this.state.showContact} photographers={this.state.photographers}/>
    )
  }
  
  render() {
    return (
        <div className="container">
          <button className="menu_middle" onClick={() => this.setState({showContact: true})}>Contactez-moi</button>
          {this.modalCarousel()}
          {this.modalContact()}
          <a className="icon" href="/">FishEye</a>
          <div className="Jumbotron">
            <div className="card">
              <div className="card-body">
                <div className="user__name">{this.state.photographers?.name}</div>
                <div className="user__address">{this.state.photographers?.city}, {this.state.photographers?.country}</div>
                <div>{this.state.photographers?.tagline}</div>
                <div className="user__tags">{this.state.tags}</div>
              </div>
              <div className="card-middle">
                <button className="card-buttom" onClick={() => this.setState({showContact: true})} >
                  Contactez-moi
                </button>
              </div>
              <div className="card-pic">
                <img className="image-cropper" src={process.env.PUBLIC_URL + "/assets/Photographers/" + this.state.photographers?.portrait} alt={this.state.photographers?.portrait} />
              </div>
            </div>
          </div>
          <div className="filter">
            <p className="text-filter"><b>Trier par</b></p>
                <select className="select-tag" name="filter" value={this.state.filter} onChange={(event) => this.swap(this.state.filter, event.target.value)}>
                  <option value={this.state.filter[0]}>{this.state.filter[0]}</option>
                  <option value={this.state.filter[1]}>{this.state.filter[1]}</option>
                  <option value={this.state.filter[2]}>{this.state.filter[2]}</option>
                </select>
          </div>
          <div className="media">
            {this.displayCard(this.state.media)}
          </div>
          <MenuFixedDesktop likes={this.state.likes} price={this.state.photographers?.price}/>
        </div>
    );
  }
}

export default Photographer;