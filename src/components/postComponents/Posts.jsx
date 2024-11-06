import { React, useEffect, useState, useContext } from "react"
import { ReRenderContext, UserContext } from '../../App';
import { PostInList } from './PostInList';
import { Nav } from "../otherComponents/Nav";
import "../../css/posts.css"

export function Posts(props) {
    const { currentUser } = useContext(UserContext);
    const { setRerender, rerender } = useContext(ReRenderContext);
    const [postsArray, setPostsArray] = useState([]);
    const [tempPostsArray, setTempPostsArray] = useState([]);
    const [searchById, setsearchById] = useState('');
    const [searchByTitle, setSearchByTitle] = useState('');
    const [searchMode, setSearchMode] = useState(false);
    const [additionMode, setAdditionMode] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostBody, setNewPostBody] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/Posts?userId=${currentUser.id}`)
            .then((response) => {
                return (
                    response.ok ? (setRerender(false), response.json()) : alert("error")
                );
            })
            .then((data) => {
                setPostsArray(data);
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }, [rerender]);

    function search() {
        const filteredPosts = postsArray.filter(post => {
            if (searchById && post.id != searchById) {
                return false;
            }
            if (searchByTitle && !post.title.includes(searchByTitle)) {
                return false;
            }
            return true;
        });
        setTempPostsArray([...postsArray])
        setPostsArray([...filteredPosts]);
        setSearchMode(true)
    }

    function clearSearch() {
        setPostsArray([...tempPostsArray]);
        setTempPostsArray([]);
        setSearchByTitle('');
        setsearchById('');
        setSearchMode(false);
    }

    function addNewPost() {
        let newPost = {
            "userId": currentUser.id,
            "title": newPostTitle,
            "body": newPostBody
        };
        fetch('http://localhost:8000/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newPost) })
            .then((response) => {
                if (response.ok) {
                    alert(`post: ${newPostTitle} has been successfully added`);
                    setRerender(true);
                    setNewPostTitle("");
                    setNewPostBody("");
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
            <h3 className="title">{currentUser.name}'s posts</h3>
            <div className="search-container-a">
                <p>Search:</p>
                <input type="text" placeholder="by number" value={searchById} onChange={e => setsearchById(e.target.value)} />
                <input type="text" placeholder="by header" value={searchByTitle} onChange={e => setSearchByTitle(e.target.value)} />
                {!searchMode ?
                    (<button onClick={search}>search</button>)
                    :
                    (<button onClick={clearSearch}>clear search</button>)}
            </div>
            {additionMode ?
                <div className="add-post-container">
                    <input type="text" placeholder="title..." value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)} />
                    <input type="text" placeholder="body..." value={newPostBody} onChange={e => setNewPostBody(e.target.value)} />
                    <button onClick={addNewPost}>add</button>
                </div>
                :
                postsArray.length > 0 ? (
                    <div className="posts-container">
                        <button onClick={() => setAdditionMode(true)}>add new post</button>
                        <div className="post-list">
                            {postsArray.map((post) => <div className="post-frame"><PostInList post={post} key={post.id} /></div>)}
                        </div>
                    </div>
                ) : (
                    searchMode ? (
                        <h1 className="no-results">No search results...</h1>
                    ) : (
                        <h1 className="no-posts">You don't have any posts. Add one now!</h1>
                    )
                )}
        </div>
    )
}