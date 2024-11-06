import { useParams, useNavigate } from "react-router-dom";
import { Photo } from "./Photo";
import { useEffect, useState, React, useContext } from "react";
import { ReRenderContext, UserContext } from '../../App';
import '../../css/Album.css';

export function Album() {
    const navigate = useNavigate();
    const { albumId } = useParams();
    const { currentUser } = useContext(UserContext);
    const { setRerender, rerender } = useContext(ReRenderContext);
    const [photosArray, setPhotosArray] = useState([]);
    const [currentPhotosPage, setCurrentPhotosPage] = useState(1);
    const [total_pages, setTotal_pages] = useState(0);
    const [additionMode, setAdditionMode] = useState(false);
    const [newPhotoTitle, setNewPhotoTitle] = useState('');
    const [newPhotoPath, setNewPhotoPath] = useState('');
    const photosPerPage = 10;

    useEffect(() => {
        fetch(`http://localhost:8000/Photos?albumId=${albumId}&_page=${currentPhotosPage}&_limit=${photosPerPage}`)
            .then((response) => {
                setRerender(false);
                return (
                    response.ok ? (setTotal_pages(parseInt(response.headers.get('X-Total-Count', '0')) / photosPerPage), response.json()
                    ) : (
                        alert("500 err, internal server error, try again later.")
                    )
                );
            })
            .then((data) => {
                setPhotosArray(data);
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }, [rerender, currentPhotosPage]);

    function addPhoto() {
        let newPhoto = {
            "albumId": albumId,
            "title": newPhotoTitle,
            "url": "",
            "thumbnailUrl": newPhotoPath,
        }
        fetch('http://localhost:8000/photos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newPhoto) })
            .then((response) => {
                setRerender(true);
                response.ok ?
                    alert(`photo: ${newPhotoTitle} has been successfully added`) : alert("error")
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
        setNewPhotoTitle('');
        setNewPhotoPath('');
        setAdditionMode(false);
    }

    return (
        <div className="image-gallery-container">
            <button onClick={() => { navigate(`/users/${currentUser.id}/Home/Albums`) }}>back to my albums</button>
            {(additionMode) ? (
                <div>
                    <input type="text" value={newPhotoTitle} className="photo-input" placeholder="new photo's title" onChange={(e) => setNewPhotoTitle(e.target.value)} />
                    <input type="text" value={newPhotoPath} className="photo-input" placeholder="new photo's path" onChange={(e) => setNewPhotoPath(e.target.value)} />
                    <button onClick={addPhoto} className="add-photo-button">save new photo</button>
                </div>
            ) : (
                <button onClick={() => setAdditionMode(true)} className="add-photo-button">add new photo</button>
            )}

            {photosArray.length > 0 ? (
                <div className="photo-gallery">
                    {photosArray.map((photo) => <Photo key={photo.id} photo={photo} />)}
                    {currentPhotosPage > 1 && <button onClick={() => setCurrentPhotosPage(currentPhotosPage - 1)}>prev</button>}
                    {currentPhotosPage < total_pages && <button onClick={() => setCurrentPhotosPage(currentPhotosPage + 1)} className="next-button">next</button>}
                </div>
            ) : (
                <h1>You don't have any photos. Add one now!</h1>
            )}
        </div >
    );
};