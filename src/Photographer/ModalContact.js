import React from 'react';
import './ModalContact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

export default class ModalContact extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        };
    }

    render()
    {
        if (!this.props.show) {
            return null;
        }
        return(
            <div className="modal-contact">
                <div className="modal-contact-content">
                    <div className="modal-contact-header">
                        <FontAwesomeIcon icon={faTimes} onClick={this.props.onClose} />
                        <h1>Contactez-moi Name</h1>
                    </div>
                    <div className="modal-contact-body">
                    <form>
                        <label for="Pname">Prénom </label><br />
                        <input type="text" name="prénom" /><br />
                        <label for="Nname">Nom</label><br />
                        <input type="text" name="lname" /><br />
                        <label for="email">Email</label><br />
                        <input type="text" name="email" /><br />
                        <label for="message">Message</label><br />
                        <textarea rows="4" cols="30" name="comment" form="usrform">Enter text here...</textarea><br />
                        <input type="submit" value="Envoyer" /><br />
                    </form> 
                    </div>
                </div>
            </div>
        );
    }
}