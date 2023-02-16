import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

function Education({ education }) {

    const educations = education.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                {/* {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'} */}
                <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - {
                    edu.to === null ? ('Now') : (<Moment format='DD/MM/YYYY'>{edu.to}</Moment>)
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
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </React.Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,

};

export default Education;