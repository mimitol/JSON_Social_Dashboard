import "../../css/Todos.css"
import { React, useEffect, useState, useContext, createContext } from "react"
import { UserContext, ReRenderContext } from '../../App'
import { TodoInList } from './TodoInList'
import { Nav } from "../otherComponents/Nav"

export function Todos(props) {
    const { currentUser } = useContext(UserContext);
    const { setRerender, rerender } = useContext(ReRenderContext);
    const [todosArray, setTodosArray] = useState([]);
    const [tempTodosArray, setTempTodosArray] = useState([]);
    const [searchById, setsearchById] = useState('');
    const [searchByTitle, setSearchByTitle] = useState('');
    const [searchByStatus, setSearchByStatus] = useState('');
    const [searchMode, setSearchMode] = useState(false);
    const [additionMode, setAdditionMode] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [showByCriterion, setShowByCriterion] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/Todos?userId=${currentUser.id}`)
            .then((response) => {
                return (
                    response.ok ? (setRerender(false), response.json()) : alert("error")
                );
            })
            .then((data) => {
                setTodosArray(data);
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }, [rerender]);

    function addTodo() {
        let newTodo = {
            "userId": currentUser.id,
            "title": newTodoTitle,
            "completed": false
        }
        fetch('http://localhost:8000/todos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTodo) })
            .then((response) => {
                (response.ok) ?
                    (setRerender(true),
                        alert(`todo: ${newTodoTitle} has been successfully added`))
                    :
                    alert("error");

            }).catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
        setNewTodoTitle('');
        setAdditionMode(false);
    }

    function search() {
        const filteredTodos = todosArray.filter(todo => {
            if (searchById && todo.id != searchById) {
                return false;
            }
            if (searchByTitle && !todo.title.includes(searchByTitle)) {
                return false;
            }
            if (searchByStatus && todo.completed.toString() !== searchByStatus) {
                return false;
            }
            return true;
        });
        setTempTodosArray([...todosArray]);
        setTodosArray([...filteredTodos]);
        setSearchMode(true)
    }

    function clearSearch() {
        setTodosArray([...tempTodosArray]);
        setTempTodosArray([]);
        setSearchByTitle('');
        setsearchById('');
        setSearchByStatus('');
        setSearchMode(false);
    }

    function handleShowByCriterion(event) {
        setShowByCriterion(event.target.value);
        switch (event.target.value) {
            case "serially":
                setTodosArray(todosArray.sort((t1, t2) => t1.id - t2.id));
                break;
            case "alphabetically":
                setTodosArray(todosArray.sort((t1, t2) => t1.title.localeCompare(t2.title)));
                break;
            case "complete":
                setTodosArray(todosArray.sort((t1, t2) => t1.completed - t2.completed));
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <Nav />
            <h3 className="title">{currentUser.name}'s todos</h3>
            <div className="search-container">
                <div>
                    <p>order by:</p>
                    <select value={showByCriterion} onChange={(event) => handleShowByCriterion(event)}>
                        <option value="serially">serially</option>
                        <option value="alphabetically">alphabetically</option>
                        <option value="complete">uncompleted tasks first</option>
                    </select>
                </div>
                <div>
                    <p>Search:</p>
                    <input type="text" placeholder="by number" value={searchById} onChange={e => setsearchById(e.target.value)} />
                    <input type="text" placeholder="by title" value={searchByTitle} onChange={e => setSearchByTitle(e.target.value)} />
                    <select value={searchByStatus} onChange={e => setSearchByStatus(e.target.value)}>
                        <option value="">All tasks</option>
                        <option value="true">completed tasks</option>
                        <option value="false">not completed tasks</option>
                    </select>
                    {searchMode == false ?
                        (<button onClick={search}>search</button>)
                        :
                        (<button onClick={clearSearch}>clear search</button>)}
                </div>
            </div>
            {additionMode ? (
                <div className="add-todo-container">
                    <input type="text" value={newTodoTitle} placeholder="todo..." onChange={e => setNewTodoTitle(e.target.value)} />
                    <button onClick={addTodo}>save new todo</button></div>)
                :
                (
                    <button onClick={() => setAdditionMode(true)}>add new todo</button>
                )
            }
            {todosArray.length > 0 ? (
                <div className="todo-container">
                    {todosArray.map(
                        (todo) => <div className="todo-frame">
                            <TodoInList todo={todo} key={todo.id} />
                        </div>
                    )}
                </div>)
                :
                (
                    searchMode ? (
                        <h1>No search results...</h1>
                    ) : (
                        <h1>You don't have any todos. Add one now!</h1>
                    )
                )}
        </div>
    )
}
