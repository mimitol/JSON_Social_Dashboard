import { useNavigate } from 'react-router-dom';
import { React, useContext } from 'react';
import { UserContext } from '../../App';

export function PostInList(props) {
    const { currentUser, setUserData } = useContext(UserContext);
    const navigate = useNavigate();
   
    return (
        <div className='item'>
            <p>post number:{props.post.id} </p>
            <p>title: {props.post.title} </p>
            <button onClick={() => navigate(`/users/${currentUser.id}/Home/Posts/${props.post.id}`, { state: { post: props.post, deletePost: props.deletePost } })}>view post</button>
        </div>)
}