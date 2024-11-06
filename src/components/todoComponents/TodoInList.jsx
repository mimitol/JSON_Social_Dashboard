import { React, useContext, useState } from 'react'
import { UserContext, ReRenderContext } from '../../App'

export function TodoInList(props) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.todo.title);
    const [completed, setCompleted] = useState(props.todo.completed);
    const { currentUser } = useContext(UserContext);
    const { setRerender } = useContext(ReRenderContext);

    function deleteTodo(id) {
        fetch(`http://localhost:8000/todos/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.ok ? (alert(`todo number: ${id} has been successfully deleted`), setRerender(true)) : alert("error"))
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }

    function updateTodo(id) {
        const updatedTodo = { userId: currentUser.id, title: title, completed: completed };
        fetch(`http://localhost:8000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo)
        })
            .then((response) => response.ok ? (setRerender(true), alert(`tod number:${id} successfully updated`)) : alert("error"))
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
        setEditMode(false);
    }

    function handleCompletedTodo() {
        setCompleted(true);
        updateTodo(props.todo.id);
    }

    return (
        <div className='item'>
            <input type="checkbox" checked={completed} disabled={completed} onChange={handleCompletedTodo} />
            <p>todo number:{props.todo.id} </p>
            <p>title: {props.todo.title} </p>
            {editMode == true ? (
                <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <button onClick={() => updateTodo(props.todo.id)}>save canghes</button>
                </div>)
                :
                (<button onClick={() => setEditMode(true)}>change this todo</button>
                )}
            <button onClick={() => deleteTodo(props.todo.id)}>delete this todo</button>
        </div>
    );
}
