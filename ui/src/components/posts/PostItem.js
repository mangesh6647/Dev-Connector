import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from "react-moment";
import { connect } from 'react-redux';
import Developer from '../../img/Developer.jpg';
import { addLike, removeLike, deletePost } from '../../actions/post';

function PostItem({ addLike, removeLike, deletePost, auth,
    post: { _id, text, name, user, likes, comments, date }, showActions }) {

    const buttonStyle = {
        backgroundColor: auth.user.name === name ? 'rgb(236, 236, 229)' : 'white'
    }

    const [liked, setLiked] = useState(false);
    const [removeliked, setRemoveLiked] = useState(false);

    const handleLike = () => {
        setLiked(true);
        setTimeout(() => {
            setLiked(false);
        }, 1000);
    };

    const handleRemoveLike = () => {
        setRemoveLiked(true);
        setTimeout(() => {
            setRemoveLiked(false);
        }, 1000);
    };

    const isPostLiked = () => {
        const valueExists = likes.some(item => item.user === auth.user._id);
        return valueExists;
    }
    return (
        <div className={auth.user.name === name ? "post bgPost bg-blue p-1 my-1" : "post bg-blue p-1 my-1"}>
            <div>
                <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={Developer}
                        alt="No Image"
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
                </p>
                {showActions && <React.Fragment>
                    <button onClick={() => { handleLike(); addLike(_id) }} type="button"
                        className={liked ? "liked btn btn-light" : "btn btn-light"} style={buttonStyle}>

                        <i className={`fas fa-thumbs-up ${isPostLiked() ? 'liked' : ''}`}></i>{' '}

                        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                    </button>
                    <button type="button" onClick={() => { handleRemoveLike(); removeLike(_id) }}
                        className={removeliked ? "disliked btn btn-light" : "btn btn-light"} style={buttonStyle}>

                        <i className="fas fa-thumbs-down"></i>

                    </button>
                    <Link to={`/posts/${_id}`} className="btn btn-primary">
                        Discussion {comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}

                    </Link>
                    {!auth.loading && user === auth.user._id && (
                        <button
                            onClick={() => deletePost(_id)}
                            type="button"
                            className="btn btn-danger"
                        >
                            <i className="fas fa-times" />
                        </button>
                    )}
                </React.Fragment>}

            </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}
PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);