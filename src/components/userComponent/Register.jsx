import { React, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import "../../css/LoginRegister.css";

export function Register() {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    const [buttonState, setButtonState] = useState("none");
    const [userPassword, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    function registerFunction(event) {
        event.preventDefault();
        const userName = event.target.userName.value;
        const userPassword = event.target.userPassword.value;
        fetch(`http://localhost:8000/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: userName, website: userPassword })
        })
            .then((response) => {
                return (
                    response.ok ? (response.json())
                        : (alert("you are recognized as a registered user, check your details or login"),
                            setButtonState("block"))
                );
            })
            .then((data) => {
                setCurrentUser({ userName: data.userName, id: data.id });
                navigate(`/Register/FullDetails`);
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }

    function handleVerifyPassword() {
        if (userPassword !== verifyPassword) {
            alert('Passwords do not match!');
            setVerifyPassword('');
        }
    }

    return (
        <form onSubmit={registerFunction} className="login-register-form">
            <label htmlFor="userName">name:</label>
            <input type="text" id="userName" />
            <div>
                <label htmlFor="userPassword">Password:</label>
                <input type="password" id="userPassword" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="verifyPassword">Verify Password:</label>
                <input type="password" id="verifyPassword" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} onBlur={handleVerifyPassword} />
            </div>
            <input type="submit" />
            <button onClick={() => { navigate("/Login") }} style={{ display: buttonState }}>login</button>
        </form>
    )
}