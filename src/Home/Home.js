import React from 'react';

import './Home.css';
import ContactCard from "./ContactCard";
let json = require('./../data.json');

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          tag: 0
        };
      }

    render() {
        var photographers = [];
        if (this.state.tag === 0) {
            for (const photographer of json.photographers) {
                photographers.push(ContactCard(photographer));
            }
        }
        else {
            for (const photographer of json.photographers) {
                if (photographer.tags.includes(this.state.tag)) {
                    photographers.push(ContactCard(photographer));
                }
            }
        }
     return(
        <div>
            <header className="index">
            <a className="icon" href="/">FishEye</a>
            <nav className="index__tag">
                <div className="bottom" onClick={() => (this.state.tag === "portrait") ? this.setState({tag : 0}): this.setState({tag : "portrait"})}>#Portrait</div>
                <div className="bottom" onClick={() => (this.state.tag === "art") ? this.setState({tag : 0}): this.setState({tag : "art"})}>#Art</div>
                <div className="bottom" onClick={() => (this.state.tag === "fashion") ? this.setState({tag : 0}): this.setState({tag : "fashion"})}>#Fashion</div>
                <div className="bottom" onClick={() => (this.state.tag === "architecture") ? this.setState({tag : 0}): this.setState({tag : "architecture"})}>#Architecture</div>
                <div className="bottom" onClick={() => (this.state.tag === "travel") ? this.setState({tag : 0}): this.setState({tag : "travel"})}>#Travel</div>
                <div className="bottom" onClick={() => (this.state.tag === "sport") ? this.setState({tag : 0}): this.setState({tag : "sport"})}>#Sport</div>
                <div className="bottom" onClick={() => (this.state.tag === "animals") ? this.setState({tag : 0}): this.setState({tag : "animals"})}>#Animals</div>
                <div className="bottom" onClick={() => (this.state.tag === "events") ? this.setState({tag : 0}): this.setState({tag : "events"})}>#Events</div>
            </nav>
            <div className="index__title">Nos photographes</div>
            </header>
                <div className="users">
                    {photographers.map(photographer => 
                        <div key={photographer.id}>{photographer}</div>
                    )}
                </div>
        </div>
     );
    }
    

}

export default Home;