import axios from 'axios';
//import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES, GET_REPOS, NO_REPOS } from './types';
//import { scrollToTop } from '../utils/scrollToTop';
import { errorToaster, successToaster, infoToaster } from '../utils/Toaster';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: NO_REPOS
        });
    }
};
//Create or update Profile.
export const createProfile = (formData, navigate, edit = false) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);


        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        // dispatch(
        //     setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
        // );
        // scrollToTop();
        successToaster(edit ? 'Profile Updated' : 'Profile Created');
        if (!edit) {
            navigate('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            //errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            errors.forEach((error) => errorToaster(error.msg));
        }
        //scrollToTop();
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


//Add Experience

export const addExperience = (formData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        // scrollToTop();
        // dispatch(
        //     setAlert('Experience Added', 'success')
        // );

        successToaster('Experience Added');

        navigate('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            //errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            errors.forEach((error) => errorToaster(error.msg));
        }
        //scrollToTop();
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        // scrollToTop();
        // dispatch(
        //     setAlert('Education Added', 'success')
        // );
        successToaster('Education Added');


        navigate('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            //errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            errors.forEach((error) => errorToaster(error.msg));
        }
        //scrollToTop();
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        //scrollToTop();
        //dispatch(setAlert('Experience Removed', 'success'));
        successToaster('Experience Removed');
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        //scrollToTop();
        //dispatch(setAlert('Education Removed', 'success'));
        successToaster('Education Removed');
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete('/api//profile');

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            //scrollToTop();
            //dispatch(setAlert('Your account has been permanently deleted', 'success'));
            infoToaster('Your account has been permanently deleted');
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};