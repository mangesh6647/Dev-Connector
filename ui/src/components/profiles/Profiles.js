import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

function Profiles({ getProfiles, profile: { profiles, loading } }) {

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    const [searchWord, setSearchWord] = useState('')
    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         console.log("sdfgdfg", searchWord);
    //         searchWord.trim();
    //         // let filteredValue;
    //         // if (searchWord !== '') {
    //         //     //setFilteredProfile(filteredValue)
    //         // }
    //     }
    // }
    let filteredValue = [];
    if (searchWord.length > 0) {
        filteredValue = profiles.filter((profile) => {
            const name = profile.user.name.toLowerCase();
            return name.includes(searchWord.toLowerCase())
        })
    }
    else {
        filteredValue = profiles;
    }
    return (
        <React.Fragment>
            {loading ? <Spinner /> : <section className="container">
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop" /> Browse and connect with
                    developers
                </p>
                <input type="text" placeholder="Search a developer..." className='developer-search'
                    onChange={event => setSearchWord(event.target.value)} />
                <div className="profiles">
                    {filteredValue.length > 0 ? (
                        filteredValue.map((profile) => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : (
                        <h4>No profiles found...</h4>
                    )}
                </div>
            </section>}
        </React.Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

