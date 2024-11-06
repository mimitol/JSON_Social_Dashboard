import { React, useEffect, useState, useContext } from "react"
import { ReRenderContext, UserContext } from '../../App'
import { AlbumInList } from "./AlbumInList"
import { Nav } from "../otherComponents/Nav"
import "../../css/Albums.css"

export function Albums() {
    const { currentUser } = useContext(UserContext);
    const { setRerender, rerender } = useContext(ReRenderContext);
    const [albumsArray, setAlbumsArray] = useState([]);
    const [tempAlbumsArray, setTempAlbumsArray] = useState([]);
    const [searchById, setSearchById] = useState('');
    const [searchByTitle, setSearchByTitle] = useState('');
    const [searchMode, setSearchMode] = useState(false);
    const [additionMode, setAdditionMode] = useState(false);
    const [newAlbumTitle, setNewAlbumTitle] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/Albums?userId=${currentUser.id}`)
            .then((response) => {
                setRerender(false);
                return (
                    response.ok ? response.json() : alert("500 err, internal server error, try again later.")
                );
            })
            .then((data) => {
                setAlbumsArray(data);
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }, [rerender]);

    function search() {
        const filteredAlbums = albumsArray.filter(album => {
            if (searchById && album.id != searchById) {
                return false;
            }
            if (searchByTitle && !album.title.includes(searchByTitle)) {
                return false;
            }
            return true;
        });
        setTempAlbumsArray([...albumsArray]);
        setAlbumsArray([...filteredAlbums]);
        setSearchMode(true);
    }

    function clearSearch() {
        setAlbumsArray([...tempAlbumsArray]);
        setTempAlbumsArray([]);
        setSearchByTitle('');
        setSearchById('');
        setSearchMode(false);
    }

    function addAlbum() {
        let newAlbum = {
            "userId": currentUser.id,
            "title": newAlbumTitle,
        };
        fetch('http://localhost:8000/albums', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAlbum) })
            .then((response) => {
                if (response.ok) {
                    alert(`album: ${newAlbumTitle} has been successfully added`);
                    setRerender(true);
                    setNewAlbumTitle("");
                }
                else {
                    alert("error");
                }
            }).catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
        setAdditionMode(false);
    }

    return (
        <div>
            <Nav />
            <h2 className="title">{currentUser.name}'s albums</h2>
            <div className="search-container-a">
                <p>Search:</p>
                <input type="text" placeholder="by number" value={searchById} onChange={e => setSearchById(e.target.value)} />
                <input type="text" placeholder="by header" value={searchByTitle} onChange={e => setSearchByTitle(e.target.value)} />
                {!searchMode ? (
                    <button className="button" onClick={search}>search</button>
                ) : (
                    <button className="button" onClick={clearSearch}>clear search</button>
                )}
            </div>
            {additionMode ? (
                <div className="add-album-container">
                    <input type="text" value={newAlbumTitle} placeholder="title..." onChange={e => setNewAlbumTitle(e.target.value)} />
                    <button className="button" onClick={addAlbum}>save new album</button></div>
            ) : (
                <button className="button" onClick={() => setAdditionMode(true)}>add new album</button>
            )}
            {albumsArray.length > 0 ? (
                <div className="album-container">
                    {albumsArray.map((album) => (
                        <div class="album-frame"><AlbumInList album={album} key={album.id} /></div>
                    ))}
                </div>
            ) : (
                searchMode ? (
                    <h1>No search results...</h1>
                ) : (
                    <h1>You don't have any Albums. Add one now!</h1>
                )
            )}
        </div>
    );
}