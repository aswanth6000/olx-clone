import React, { useContext, useState } from 'react';
import { firebaseContext } from '../../store/firebaseContext';
import Logo from '../../assets/Images/olx-logo.png';
import './login.scss';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const {firebase} = useContext(firebaseContext)
  const auth = firebase.getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const handleSubmit =(e)=>{
    e.preventDefault();
    firebase.signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  })
  .then(()=>{
    navigate('/home')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    const errorMessageArray = errorMessage.split(' ');
    errorMessageArray.shift();
    const errorMessageOnly = errorMessageArray.join(' ');
    setError(errorMessageOnly)
  });

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <p style={{color:"red"}}>{error}</p>
          <button>Login</button>
        </form>
        <a href='/'>Signup</a>
      </div>
    </div>
  );
}

export default Login;