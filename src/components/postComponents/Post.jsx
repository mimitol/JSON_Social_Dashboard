import { useLocation, useNavigate } from "react-router-dom";
import { React, useContext, useState } from 'react';
import { ReRenderContext, UserContext } from '../../App';
import { Comments } from "./Comments";
import '../../css/Post.css';
export function Post(props) {
    const { currentUser } = useContext(UserContext);
    const { setRerender } = useContext(ReRenderContext);
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state.post;
    const [postTitle, setPostTitle] = useState(post.title);
    const [postBody, setPostBody] = useState(post.body);
    const [editMode, setEditMode] = useState(false);
    const [additionMode, setAdditionMode] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentName, setCommentName] = useState('');
    const [commentBody, setCommentBody] = useState('');

    function deletePost(id) {
        fetch(`http://localhost:8000/Posts/${id}`, { method: 'DELETE' }
        )
            .then((response) =>
                response.ok ? (alert(`post number: ${id} has been successfully deleted`),
                    setRerender(true),
                    navigate(`/users/${currentUser.id}/Home/Posts`)) : alert("error"))
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }

    function editPost() {
        const editedPost = { title: postTitle, body: postBody, userId: post.userId };
        fetch(`http://localhost:8000/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedPost),
        })
            .then((response) => response.ok ? alert(`post number:${post.id} successfully edited`) : alert("error"))
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
        setEditMode(false)
        setRerender(true)
    }

    function addComment() {
        let newComment = {
            "postId": post.id,
            "name": commentName,
            "email": currentUser.email,
            "body": commentBody
        };
        fetch('http://localhost:8000/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        })
            .then((response) => {
                if (response.ok) {
                    alert(`comment: ${commentBody} has been successfully added`);
                    setCommentBody("");
                    setCommentName("");
                }
                else {
                    alert("error");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
        setAdditionMode(false);
    }

    return (
        <div className="container">
            <div className="post">
                <button onClick={() => { navigate(`/users/${currentUser.id}/Home/Posts`) }}>back to my Posts</button>
                <p>post number:{post.id} </p>
                {editMode ?
                    (<div>
                        <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                        <input type="text" value={postBody} onChange={(e) => setPostBody(e.target.value)} />
                        <button onClick={editPost}>save canghes</button>
                    </div>)
                    :
                    (<div>
                        <h3>title: {postTitle} </h3>
                        <p>{postBody}</p>
                        <button onClick={() => setEditMode(true)}>edit this post</button>
                    </div>)}
                <button onClick={() => (deletePost(post.id))}>delete this post</button>
                {additionMode ?
                    (<div>
                        <input type="text" value={commentName} onChange={(e) => setCommentName(e.target.value)} />
                        <input type="text" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
                        <button onClick={addComment}>save canghes</button>
                    </div>) :
                    (<button onClick={() => setAdditionMode(true)}>add a comment</button>)
                }
                {showComments ?
                    (<div>
                        <button onClick={() => setShowComments(false)}>hide comments</button>
                        <Comments post={post} />
                    </div>) :
                    (<button onClick={() => setShowComments(true)}>view comments</button>)
                }
            </div>
        </div >
    )
}