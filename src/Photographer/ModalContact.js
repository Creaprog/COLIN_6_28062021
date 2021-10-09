import React from 'react';
import './ModalContact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
export default class ModalContact extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            error : ""
        };
    }

    contactSubmit = (e) => {
        e.preventDefault();
        console.log("Prénom : " + e.target.elements.prénom.value);
        console.log("Nom : " + e.target.elements.nom.value);
        console.log("Email : " + e.target.elements.email.value);
        console.log("Message : " + e.target.elements.message.value);
        if (e.target.elements.prénom.value === "" || e.target.elements.nom.value === "" || e.target.elements.email.value === "" || e.target.elements.message.value === "") {
            this.setState({error: "Veuillez remplir tous les champs"});
        }
        else {
            this.props.onClose();
        }
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
                        <div className="close">
                            <FontAwesomeIcon icon={faTimes} onClick={this.props.onClose} />
                        </div>
                        <h1>Contactez-moi<br /> {this.props.photographers.name}</h1>
                    </div>
                    <div className="modal-contact-body">
                        <div className="error">{this.state.error}</div>
                        <form onSubmit={this.contactSubmit}>
                            <label name="prénom">Prénom </label><br />
                            <input type="text" name="prénom" /><br />
                            <label name="nom">Nom</label><br />
                            <input type="text" name="nom" /><br />
                            <label name="email">Email</label><br />
                            <input type="text" name="email" /><br />
                            <label name="message">Votre message</label><br />
                            <textarea rows="4" cols="30" name="message"></textarea><br />
                            <button className="submit" type="submit">Envoyer</button><br />
                        </form> 
                    </div>
                </div>
            </div>
        );
    }
}