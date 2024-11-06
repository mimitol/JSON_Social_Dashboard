import { React, useContext } from 'react'
import { UserContext } from '../../App'
import '../../css/Info.css'

export function Info() {
    const { currentUser, setUserData }  = useContext(UserContext);  

    return ( <div className="user-details-container">
    <div className="detail">
      <p><span className="field">ID:</span> {currentUser.id}</p>
    </div>
    <div className="detail">
      <p><span className="field">Name:</span> {currentUser.name}</p>
    </div>
    <div className="detail">
      <p><span className="field">Username:</span> {currentUser.username}</p>
    </div>
    <div className="detail">
      <p><span className="field">Email:</span> {currentUser.email}</p>
    </div>
    <div className="detail">
      <p><span className="field">Phone:</span> {currentUser.phone}</p>
    </div>
    <div className="address-details">
      <h4>Address:</h4>
      <div className="detail">
        <p><span className="field">Street:</span> {currentUser.address.street}</p>
      </div>
      <div className="detail">
        <p><span className="field">Suite:</span> {currentUser.address.suite}</p>
      </div>
      <div className="detail">
        <p><span className="field">City:</span> {currentUser.address.city}</p>
      </div>
      <div className="detail">
        <p><span className="field">Zipcode:</span> {currentUser.address.zipcode}</p>
      </div>
      <div className="geo-details">
        <p><span className="field">Geo:</span></p>
        <div className="detail">
          <p><span className="field">Lat:</span> {currentUser.address.geo.lat}</p>
        </div>
        <div className="detail">
          <p><span className ="field">Lng:</span> {currentUser.address.geo.lng}</p>
          </div>
        </div>
      </div>
      <div className="company-details">
        <h4>Company:</h4>
        <div className="detail">
          <p><span className="field">Name:</span> {currentUser.company.name}</p>
        </div>
        <div className="detail">
          <p><span className="field">Catch Phrase:</span> {currentUser.company.catchPhrase}</p>
        </div>
        <div className="detail">
          <p><span className="field">BS:</span> {currentUser.company.bs}</p>
        </div>
      </div>
    </div>
  );
}

