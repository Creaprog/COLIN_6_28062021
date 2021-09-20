import './Photographer.css';
import '../App.css';
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faHeart } from '@fortawesome/fontawesome-free-solid';
import MenuFixedDesktop from './MenuFixed.js';
import TagsCard from "./../Home/TagsCard";

class Photographer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ['Popularité', 'Date', 'Titre'],
      media: [],
      photographers: [],
      tags: [],
    };
  }

  async call() {
    await axios.get("/data.json")
      .then(result => this.setState({
        media: result.data.media.filter(m => m.photographerId.toString() === this.props.match.params.id),
        photographers: result.data.photographers.filter(p => p.id.toString() === this.props.match.params.id)
      }))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.call().then(() => {
      this.createTagsCard(this.state.photographers[0].tags);
    })
  }

  imageCard(media) {
    return (
      <div key={media.id}>
        <img className="image-rectangle" src={process.env.PUBLIC_URL + "/assets/" + this.state.photographers[0].name + "/" + media.image} alt={media.title} />
        <div className="card-text">
          <div className="card-title">{media.title}</div>
          <div className="heart">{media.likes} <FontAwesomeIcon icon={faHeart} /></div>
        </div>
      </div>
    );
  }

  videoCard(media) {
    return (
      <div key={media.id}>
        <video className="video-rectangle" autoPlay width="320">
          <source src={process.env.PUBLIC_URL + "/assets/" + this.state.photographers[0].name + "/" + media.video} type="video/mp4" />
        </video>
        <div className="card-text">
          <div className="card-title">{media.title}</div>
          <div className="heart">{media.likes} <FontAwesomeIcon icon={faHeart} /></div>
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
      tags.push(<div key={tag.toString()}>{TagsCard(tag)}</div>);
    }
    this.setState({tags: tags});
  }

  render() {
    return (
      <div className="container">
        <a className="icon" href="/">FishEye</a>
        <div className="Jumbotron">
          <div className="card">
            <div className="card-body">
              <div className="user__name">{this.state.photographers[0]?.name}</div>
              <div className="user__address">{this.state.photographers[0]?.city}, {this.state.photographers[0]?.country}</div>
              <div>{this.state.photographers[0]?.tagline}</div>
              <div className="user__tags">{this.state.tags}</div>
            </div>
            <div className="card-middle">
              <div className="card-buttom">
                Contactez-moi
              </div>
            </div>
            <div className="card-pic">
              <img className="image-cropper" src={process.env.PUBLIC_URL + "/assets/Photographers/" + this.state.photographers[0]?.portrait} alt={this.state.photographers[0]?.portrait} />
            </div>
          </div>
        </div>
        <div className="filter">
          <p className="text-filter"><b>Trier par</b></p>
          <nav className="nav-filter">
            <ul className="nav-main">
              <div className="link" onClick={() => this.swap(this.state.filter, this.state.filter[0])}>
                {this.state.filter[0]} <FontAwesomeIcon icon={faCaretUp} />
              </div>
              <ul className="nav-sub">
                <li className="nav-item">
                  <div className="link" onClick={() => this.swap(this.state.filter, this.state.filter[1])}>{this.state.filter[1]}</div>
                </li>
                <li className="nav-item">
                  <div className="link" onClick={() => this.swap(this.state.filter, this.state.filter[2])}>{this.state.filter[2]}</div>
                </li>
              </ul>
            </ul>
          </nav>
        </div>
        <div className="media">
          {this.displayCard(this.state.media)}
        </div>
        <MenuFixedDesktop />
      </div>
    );
  }
}

export default Photographer;