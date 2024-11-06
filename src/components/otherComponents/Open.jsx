import { Link } from "react-router-dom";
import "../../css/Open.css"; 

export function Open() {
    return (
        <div className="open-container">
            <Link to="/Login" className="link">registered user? sign in</Link>
            <br />
            <Link to="/Register" className="link">new user? sign up</Link>
        </div>
    );
}