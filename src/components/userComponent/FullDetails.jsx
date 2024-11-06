import { React, useContext } from 'react'
import { UserContext } from '../../App'
import { useNavigate } from 'react-router-dom';
import "../../css/LoginRegister.css";
export function FullDetails() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    function fullDetailsSubmit(event) {
        event.preventDefault();
        let newUser = {
            "name": event.target.name.value,
            "username": currentUser.userName,
            "email": event.target.email.value,
            "address": {
                "street": event.target.street.value,
                "suite": event.target.suite.value,
                "city": event.target.city.value,
                "zipcode": event.target.zipcode.value,
                "geo": {
                    "lat": event.target.lat.value,
                    "lng": event.target.lng.value
                }
            },
            "phone": event.target.name.value,
            "website": currentUser.userPassword,
            "company": {
                "name": event.target.company.value,
                "catchPhrase": event.target.catchPhrase.value,
                "bs": event.target.bs.value
            }
        };
        fetch(`http://localhost:8000/users/${currentUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then((response) => {
                return (
                    response.ok ? (setRerender(false), response.json()) : alert("error")
                );
            })
            .then((data) => {
                data.website = "";
                localStorage.setItem("currentUser", JSON.stringify(data));
                setCurrentUser(data);
                navigate(`/users/${data.id}/Home`);
            })
            .catch((error) => {
                console.error(error);
                alert("There was a problem calling the server, please try again later.");
            });
    }

    return (
        <div className='form-container'>
            <form onSubmit={fullDetailsSubmit} className="login-register-form">
                <h1>welcome {currentUser.userName}! fill in your details</h1>
                <label htmlFor="name">name:</label>
                <input type="text" id="name" minLength={2} />
                <label htmlFor="email">email:</label>
                <input type="email" id="email" />
                <div>
                    <label htmlFor="address">address:</label>
                    <input type="text" placeholder="city" required id='city' minLength={2} />
                    <input type="text" placeholder="zipcode" required id='zipcode' minLength={5} maxLength={8} />
                    <input type="text" placeholder="street" required id='street' minLength={2} />
                    <input type="text" placeholder="suite" id='suite' minLength={2} />
                    <div>
                        <label htmlFor="geo">geo:</label>
                        <input type="text" placeholder="lat" id='lat' />
                        <input type="text" placeholder="lng" id='lng' />
                    </div>
                </div>
                <input type="tel" placeholder="phone" required id='phone' minLength={10} maxLength={10} inputMode='numeric' />
                <div>
                    <label htmlFor="company">company:</label>
                    <input type="text" placeholder="name" required id='company' minLength={2} />
                    <input type="text" placeholder="catchPhrase" id='catchPhrase' minLength={5} />
                    <input type="text" placeholder="bs" id='bs' minLength={2} />
                </div>
                <input type="submit" />
            </form>
        </div>)
}
