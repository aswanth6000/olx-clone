import './App.scss';
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext, firebaseContext } from './store/firebaseContext';
function App() {
  const {userd,setUserd} = useContext(AuthContext)
  const {firebase} = useContext(firebaseContext)
  const auth = firebase.getAuth();
  useEffect(()=>{
    firebase.onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserd(user)
        console.log("eeeeeeeeeee",userd);
      } else {
        // User is signed out
        // ...
      }
    });
  })
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path='/' element={<Login/>}></Route>
        <Route  path='/home' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
