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
    firebase.onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('ssssssssss', user.uid);
        const q = firebase.query(
          firebase.collection(firebase.db, 'users'),
          firebase.where('id', '==', user.uid)
        );

        const querySnapshot = await firebase.getDocs(q);

        // Wait for the query to complete before logging the data to the console
        await querySnapshot.forEach(async (doc) => {
          // doc.data() is never undefined for query doc snapshots
          await  setUserd(doc.data());
          console.log("dddddd",userd.username, "jjjjjjj", userd.phone);
        });

       
        
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
