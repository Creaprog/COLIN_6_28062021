import React from "react"
import TagsCard from "./TagsCard";
import { Link } from "react-router-dom";

function ContactCard(props) {
    var tags = [];
    for (const tag of props.tags) {
        tags.push(<div key={tag.toString()}>{TagsCard(tag)}</div>);
    }
    return (
        <div className="user">
                <div className="user__portrait">
                    <Link to={"/photographer/" + props.id}>
                        <img className="image-cropper" src={process.env.PUBLIC_URL + "/assets/Photographers/" + props.portrait} alt={props.portrait} />
                    </Link>
                </div>
                <h2 className="user__name">
                    <Link to={"/photographer/" + props.id}>{props.name}</Link>
                </h2>
                <div className="user__address">{props.city}, {props.country}</div>
                <div>{props.tagline}</div>
                <div className="user__price">{props.price}€/jour</div>
                <div className="user__tags">{tags}</div>
        </div>
    );
}
export default ContactCard;