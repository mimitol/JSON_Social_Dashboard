import { React, useContext, useState } from "react";
import { ReRenderContext } from "../../App";
import '../../css/Photo.css';

export function Photo(props) {
    const { setRerender, rerender } = useContext(ReRenderContext);
    const [isEditstate, setIsEditstate] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [photoTitle, setPhotoTitle] = useState(props.photo.title);

    function handleDelete() {
        fetch(`http://localhost:8000/photos/${props.photo.id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                setRerender(true);
                response.ok ? alert(`photo number: ${props.photo.id} has been successfully deleted`) : alert("error")
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    };

    function handleEdit() {
        const updatedPhoto = {
            "albumId": props.photo.albumId,
            "title": photoTitle,
            "url": props.photo.url,
            "thumbnailUrl": props.photo.thumbnailUrl
        };
        fetch(`http://localhost:8000/photos/${props.photo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPhoto),
        })
            .then((response) => response.ok ? alert(`photo number:${props.photo.id} successfully updated`) : alert("error"))
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
        setIsEditstate(false);
        setRerender(true);
    };

    return (
        <div className="photo-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img src={props.photo.thumbnailUrl} alt="Component Image" className="photo"/>
            {isHovered && !isEditstate && (
                <div className="actions-container">
                    <button onClick={handleDelete}>delete</button>
                    <button onClick={() => { setIsEditstate(true) }}>edit</button>
                </div>
            )}
            {isEditstate ? (
                <div className="photo-edit-container">
                    <input value={photoTitle} onChange={(e) => setPhotoTitle(e.target.value)} />
                    <button onClick={(handleEdit)}>save changes</button>
                </div>) : null}
        </div>
    );
}