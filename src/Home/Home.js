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
          photographers: [],
          tag: this.props.match.params.tag
        };
    }

    async call() {
        await axios.get("/data.json")
          .then(result => this.setState({
            photographers: result.data.photographers
          }));
    }

    componentDidMount() {
        this.call();
    }

    componentDidUpdate(prevsprops) {
        //TODO : A refaire en ternaire
        if (this.props.match.params.tag !== prevsprops.match.params.tag) {
            this.setState({tag : this.props.match.params.tag});
        }
    }

    updateColor(value) {
        //TODO : A refaire en ternaire
        if (this.state.tag === undefined) {
            return "white";
        } if (this.state.tag === value) {
            return "#D3573C";
        }
    }

    render() {
        var photographers = [];
        
        if (this.state.tag === undefined) {
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
                <Link to="portrait" className="bottom" style={{background: this.updateColor("portrait")}} >#Portrait</Link>
                <Link to="art" className="bottom" style={{background: this.updateColor("art")}}>#Art</Link>
                <Link to="fashion" className="bottom" style={{background: this.updateColor("fashion")}}>#Fashion</Link>
                <Link to="architecture" className="bottom" style={{background: this.updateColor("architecture")}} >#Architecture</Link>
                <Link to="travel" className="bottom" style={{background: this.updateColor("travel")}}>#Travel</Link>
                <Link to="sport" className="bottom" style={{background: this.updateColor("sport")}}>#Sport</Link>
                <Link to="animals" className="bottom" style={{background: this.updateColor("animals")}}>#Animals</Link>
                <Link to="events" className="bottom" style={{background: this.updateColor("events")}}>#Events</Link>
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