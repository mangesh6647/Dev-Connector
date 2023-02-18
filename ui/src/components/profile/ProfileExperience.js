import React from "react";
import PropTypes from 'prop-types';
import Moment from "react-moment";

function ProfileExperience({
    experience: { company, title, location, current, to, from, description }
}) {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="DD/MM/YYYY">{from}</Moment>- {to ? <Moment format="DD/MM/YYYY">{to}</Moment> : 'Now'}
            </p>
            <p>
                <strong>Position: </strong> {title}
            </p>
            <p>
                <strong>Location: </strong> {location}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
};

export default ProfileExperience;