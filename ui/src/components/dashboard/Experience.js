import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

function Experience({ experience }) {

    const experiences = experience.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                {/* {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'} */}
                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> - {
                    exp.to === null ? ('Now') : (<Moment format='DD/MM/YYYY'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button

                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <React.Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </React.Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,

};

export default Experience;