import { useNavigate } from 'react-router-dom';
import { React, useContext } from 'react';
import { UserContext } from '../../App';

export function AlbumInList(props) {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className='item'>
            <p>album number:{props.album.id} </p>
            <p>title: {props.album.title} </p>
            <button onClick={() => navigate(`/users/${currentUser.id}/Home/Albums/${props.album.id}`)}>view all photos</button>
        </div>)
}