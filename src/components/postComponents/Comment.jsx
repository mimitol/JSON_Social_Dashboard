import { React, useContext, useState } from "react";
import { UserContext, ReRenderContext } from "../../App";

export function Comment(props) {
    const { currentUser } = useContext(UserContext);
    const { setRerender } = useContext(ReRenderContext);
    const [editMode, setEditMode] = useState(false);
    const [commentName, setCommentName] = useState(props.comment.name);
    const [commentBody, setCommentBody] = useState(props.comment.body);

    function deleteComment() {
        fetch(`http://localhost:8000/comments/${props.comment.id}`, {
            method: 'DELETE'
        })
            .then(setRerender(true),
                (response) => response.ok ? alert(`comment number: ${props.comment.id} has been successfully deleted`) : alert("error"))
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }

    function editComment() {
        const updatedComment = {
            "postId": props.comment.postId,
            "name": commentName,
            "email": props.comment.email,
            "body": commentBody
        };
        fetch(`http://localhost:8000/comments/${props.comment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedComment)
        })
            .then(setRerender(true),
                (response) => response.ok ? alert(`comment number:${props.comment.id} successfully updated`) : alert("error"))
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            })
        setEditMode(false);
    }

    return (
        <div>
            <b> <p>{props.comment.name}</p></b>
            <p>{props.comment.body}</p>
            {props.comment.email == currentUser.email && (
                <div>
                    <button onClick={deleteComment}>delete Comment</button>
                    {editMode ?
                        (<div>
                            <input type="text" value={commentName} onChange={(e) => setCommentName(e.target.value)} placeholder="your name" />
                            <input type="text" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} placeholder="your comment" />
                            <button onClick={editComment}>save changes</button>
                        </div>)
                        : (<button onClick={() => setEditMode(true)}>edit Comment</button>)}

                </div>
            )}
        </div>
    )
}