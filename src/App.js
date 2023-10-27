import './App.scss';
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
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
