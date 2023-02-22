import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

function MyPosts({ getPosts, post: { posts, loading }, auth }) {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    posts = posts.filter((singlePost) => {
        return singlePost.user === auth.user._id
    })

    return (
        loading ? <Spinner /> : <section className="container">
            <h1 className="large text-primary">My Posts</h1>
            <div className="posts">
                {
                    posts.length > 0 ? (posts.map((post) => (
                        <PostItem key={post._id} post={post} />
                    ))) :
                        (
                            <h4>No post found...</h4>
                        )
                }
            </div>
        </section>
    )
}

MyPosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(MyPosts);