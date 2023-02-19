import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

function CommentForm({ postId, addComment }) {
    const [text, setText] = useState('');
    return (
        <div className="message-input">
            <form onSubmit={e => {
                e.preventDefault();
                addComment(postId, { text });
                setText('');
            }}>
                <input type="text" placeholder="Leave a comment..." value={text} onChange={e => setText(e.target.value)} />
                <button type="submit"><i className="fas fa-paper-plane"></i></button>
            </form>
        </div>
    )
}
CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);