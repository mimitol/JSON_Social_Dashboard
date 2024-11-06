import  { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import "../../css/LoginRegister.css";

export function Login(props) {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    const [buttonState, setButtonState] = useState("none");

    function loginFunction(event) {
        event.preventDefault();
        const userName = event.target.userName.value;
        const userPassword = event.target.userPassword.value;
        fetch(`http://localhost:8000/users?username=${userName}&website=${userPassword}`)
            .then((response) => {
                return (
                    response.ok ? response.json() : alert("error")
                );
            })
            .then((data) => {
                if (data.length == 0) {
                    alert("you are not recognized as a registered user, check your details or sign up");
                    setButtonState("block");
                }
                else {
                    data[0].website = "";
                    localStorage.setItem("currentUser", JSON.stringify(data[0]));
                    setCurrentUser(data[0]);
                    navigate(`/users/${data[0].id}/Home`);
                }
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }

    return (
        <div className='form-container'>
            <form onSubmit={loginFunction} className="login-register-form">
                <label htmlFor="userName">name:</label>
                <input type="text" id="userName" />
                <label htmlFor="userPassword">password:</label>
                <input type="password" id="userPassword" />
                <input type="submit" />
                <button onClick={() => { navigate("/Register") }} style={{ display: buttonState }}>sign up</button>
            </form>
        </div>
    )
}