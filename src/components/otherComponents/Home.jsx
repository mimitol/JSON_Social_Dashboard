import { React, useContext, useState } from 'react'
import { UserContext } from '../../App';
import { Info } from '../userComponent/Info';
import { Nav } from './Nav';

export function Home() {
    const { currentUser } = useContext(UserContext);
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div>
            <Nav />
            <h1 className="title">Welcome {currentUser.name}!</h1>
            {showInfo ? (
                <div>
                    <button onClick={() => setShowInfo(false)}>Hide Info</button>
                    <Info />
                </div>
            ) : (
                <button onClick={() => setShowInfo(true)}>Info</button>
            )}
        </div>
    );
}