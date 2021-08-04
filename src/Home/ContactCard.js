import React from "react"
import TagsCard from "./TagsCard";

function ContactCard(props) {
    var tags = [];
    for (const tag of props.tags) {
        tags.push(TagsCard(tag));
    }
    return (
        <a className="user" href={"photographer/" + props.id}>
                <div className="user__portrait">
                <img className="image-cropper" src={process.env.PUBLIC_URL + "/assets/Photographers/" + props.portrait} alt={props.portrait} />
                </div>
                <h2 className="user__name">{props.name}</h2>
                <div className="user__address">{props.city}, {props.country}</div>
                <div>{props.tagline}</div>
                <div className="user__price">{props.price}€/jour</div>
                <div className="user__tags">{tags}</div>
        </a>
    );
}

export default ContactCard;