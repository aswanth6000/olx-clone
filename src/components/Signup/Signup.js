import React, { useState, useContext } from 'react';

import Logo from '../../assets/Images/olx-logo.png';
import {useNavigate} from 'react-router-dom'
import { firebaseContext } from '../../store/firebaseContext';
import './signup.scss';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName ] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] =useState('')
  const [error, setError] = useState('')
  const {firebase} = useContext(firebaseContext)
  const auth = firebase.getAuth();
  const handleSubmit= (e) =>{
    e.preventDefault();
    firebase.createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    user.displayName = name;
    user.phoneNumber = phone;
    console.log("dddddddddd",user);
  }).then(async ()=>{
    const docRef = await firebase.addDoc(firebase.collection(firebase.db, "users"), {
      username : name,
      phone : phone,
      email : email
    });
    console.log("Document written with ID: ", docRef.id);
  })
  .then(()=>{
    navigate("/login")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const errorMessageArray = errorMessage.split(' ');
    errorMessageArray.shift();
    const errorMessageOnly = errorMessageArray.join(' ');
    setError(errorMessageOnly)
    console.log(errorCode,"Message:", errorMessage);
  });
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <p style={{color: "red"}}>{error ? error : ''}</p>
          <button>Signup</button>
        </form>
        <a href='/'>Login</a>
      </div>
    </div>
  );
}