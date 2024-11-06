import { React, useEffect, useState, useContext } from "react";
import { ReRenderContext } from "../../App";
import { Comment } from "./Comment";

export function Comments(props) {
    const { setRerender, rerender } = useContext(ReRenderContext);
    const [commentsArray, setCommentsArray] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/Comments?postId=${props.post.id}`)
            .then((response) => {
                setRerender(false);
                return (
                    response.ok ? response.json():alert("500 err, internal server error, try again later.")
                );
            })
            .then((data) => {
                setCommentsArray(data);
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }, [rerender]);

    return (
        <div>
            {commentsArray.map((comment) => <Comment comment={comment} key={comment.id} />)}
        </div>
    )
}
