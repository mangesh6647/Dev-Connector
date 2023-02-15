import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, auth: { isAuthenticated, loading }, ...rest }) {
    if (isAuthenticated && !loading) return <Component />;
    return <Navigate to="/" />;
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);