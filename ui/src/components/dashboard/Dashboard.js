import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

function Dashboard({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return loading && profile === null ? <Spinner /> :
        <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
            {profile !== null ? <React.Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
            </React.Fragment> :
                <React.Fragment>
                    <>
                        <p>You have not yet setup a profile, please add some info.</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </>
                </React.Fragment>}
        </section>

}
// Add below code when profile state is set to null on logout of user
//return loading && profile === null

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);