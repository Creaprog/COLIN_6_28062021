import React from 'react';
import '../App.css';
import './Home.css';
import ContactCard from "./ContactCard";
import ScrollToTopBtn from "./ScrollToTopBtn";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          tag: 0,
          photographers: []
        };
      }

      async call() {
        await axios.get("/data.json")
          .then(result => this.setState({
            photographers: result.data.photographers
          }))
          .catch(error => console.log(error));
      }
    
      componentDidMount() {
        this.call();
      }
      
    updateTag(value) {
        return (this.state.tag === value) ? this.setState({tag : 0}): this.setState({tag : value});
    }

    updateColor(value) {
        return (this.state.tag === value) ? "#D3573C": "white";
    }

    render() {
        var photographers = [];
        
        if (this.state.tag === 0) {
            for (const photographer of this.state.photographers) {
                photographers.push(<div key={photographer.id.toString()}>{ContactCard(photographer)}</div>);
            }
        }
        else {
            for (const photographer of this.state.photographers) {
                if (photographer.tags.includes(this.state.tag)) {
                    photographers.push(<div key={photographer.id.toString()}>{ContactCard(photographer)}</div>);
                }
            }
        }
     return(
        <div>
            <header className="index">
            <div className="icon"><Link to={'/'}>FishEye</Link></div>
            <nav className="index__tag">
                <div className="bottom" style={{background: this.updateColor("portrait")}} onClick={() => this.updateTag("portrait")}>#Portrait</div>
                <div className="bottom" style={{background: this.updateColor("art")}} onClick={() => this.updateTag("art")}>#Art</div>
                <div className="bottom" style={{background: this.updateColor("fashion")}} onClick={() => this.updateTag("fashion")}>#Fashion</div>
                <div className="bottom" style={{background: this.updateColor("architecture")}} onClick={() => this.updateTag("architecture")}>#Architecture</div>
                <div className="bottom" style={{background: this.updateColor("travel")}} onClick={() => this.updateTag("travel")}>#Travel</div>
                <div className="bottom" style={{background: this.updateColor("sport")}} onClick={() => this.updateTag("sport")}>#Sport</div>
                <div className="bottom" style={{background: this.updateColor("animals")}} onClick={() => this.updateTag("animals")}>#Animals</div>
                <div className="bottom" style={{background: this.updateColor("events")}} onClick={() => this.updateTag("events")}>#Events</div>
            </nav>
            <div className="index__title">Nos photographes</div>
            </header>
                <div className="users">
                    {photographers}
                </div>
                <ScrollToTopBtn />
        </div>
     );
    }
    

}

export default Home;