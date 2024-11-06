import { Link, NavLink, useNavigate } from "react-router-dom";
import { React, useContext, useState } from 'react';
import { UserContext } from '../../App';
import "../../css/Nav.css";

export function Nav() {
    const navigate = useNavigate();
    const { currentUser,setCurrentUser } = useContext(UserContext);

    return (
        <div className="nav-container">
            <header >
                <Link to={`/users/${currentUser.id}/Home/Todos`} className="link">Todos</Link>
                <Link to={`/users/${currentUser.id}/Home/Albums`} className="link">Albums</Link>
                <Link to={`/users/${currentUser.id}/Home/Posts`} className="link">Posts</Link>
                <Link to={`/users/${currentUser.id}/Home`} className="link">Home</Link>
                <Link to={'/'} onClick={() => {
                    localStorage.setItem("currentUser", '')
                    setCurrentUser({})
                    navigate("/")
                }} className="link">Logout</Link>
            </header>
        </div>
        );
}