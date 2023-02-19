import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST
} from './types';

import axios from 'axios';
import { infoToaster, successToaster } from '../utils/Toaster';
import confirmDialog from '../utils/ConfirmAlert';

// Get posts

export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add like
export const addLike = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        infoToaster(err.response.data.msg);
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        infoToaster(err.response.data.msg + '. Like it first.');
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
    try {
        const confirmResult = await confirmDialog('Are you sure?');
        if (confirmResult) {
            await axios.delete(`/api/posts/${id}`);

            dispatch({
                type: DELETE_POST,
                payload: id
            });

            successToaster('Post Removed.');
        }

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};