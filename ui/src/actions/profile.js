import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';
import { scrollToTop } from '../utils/scrollToTop';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
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

        dispatch(
            setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
        );
        scrollToTop();
        if (!edit) {
            navigate('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        scrollToTop();
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}