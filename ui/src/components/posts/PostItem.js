import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from "react-moment";
import { connect } from 'react-redux';
import Developer from '../../img/Developer.jpg';
import { addLike, removeLike } from '../../actions/post';

function PostItem({ addLike, removeLike, auth,
    post: { _id, text, name, user, likes, comments, date } }) {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <a href="profile.html">
                    <img
                        className="round-img"
                        src={Developer}
                        alt="No Image"
                    />
                    <h4>{name}</h4>
                </a>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
                </p>
                <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i>{' '}
                    <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button>
                <button type="button" onClick={() => removeLike(_id)} className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${_id}`} className="btn btn-primary">
                    Discussion {comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}

                </Link>
                {!auth.loading && user === auth.user._id && (
                    <button
                        type="button"
                        className="btn btn-danger"
                    >
                        <i className="fas fa-times" />
                    </button>
                )}
            </div>
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);