import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/fontawesome-free-solid';
import './ModalCarousel.css';
import React from 'react';
import './MenuFixed.css';
export default class ModalCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          index: this.props.index
        };
    }

    componentDidUpdate(prevsprops) {
        if (this.props.index !== prevsprops.index) {
            this.setState({index : this.props.index});
        } 
    }

    componentDidMount() {
        document.addEventListener('keydown', (event) => {
            if (this.props.show) {
                if (event.code === 'Escape') {
                    this.props.onClose();
                } else if (event.code === 'ArrowLeft') {
                    this.prev();
                } else if(event.code === 'ArrowRight') {
                    this.next();
                }
            }
        });  
    }

    prev() {
        if (this.state.index > 0) {
            return this.setState({index : this.state.index - 1});
        }
        return null;
    }

    next() {
        var length = this.props.media.length;
        if (this.state.index < length - 1) {
            return this.setState({index : this.state.index + 1});
        }
        return null;
    }

    displayCard(media) {
        if (media[this.state.index].image !== undefined) {
            return this.imageCard();
        }
        return this.videoCard();
    }

    imageCard() {
        return (
            <img className="image-rectangle-carousel" src={process.env.PUBLIC_URL + "/assets/" + this.props.photographers.name + "/" + this.props.media[this.state.index].image} alt={this.props.media[this.state.index].title} />
        )
    }

    videoCard() {
        return (
            <video className="video-rectangle-carousel" autoPlay width="320">
                <source src={process.env.PUBLIC_URL + "/assets/" + this.props.photographers.name + "/" + this.props.media[this.state.index].video} type="video/mp4" />
            </video>
        )
    }
    
    render() { 
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-left" onClick={() => this.prev()}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                <div className="modal-body">
                    <div className="modal-body-header">
                        <FontAwesomeIcon className="direction" icon={faTimes} onClick={this.props.onClose} />
                    </div>
                    {this.displayCard(this.props.media)}
                    <div>
                        <div className="card-text">{this.props.media[this.state.index].title}</div>
                    </div>
                </div>
                <div className="modal-right" >
                    <FontAwesomeIcon className="direction" icon={faChevronRight} onClick={() => this.next()} />
                </div>
            </div>
        </div>
        );
    }
}
