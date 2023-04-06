import Navbar from './components/Navbar';
import { Routes, Route,Navigate } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Alert from './components/Alert';
import Signup from './components/Signup';
import './App.css';

function App() {
  return (
    <>
      {/* Wrapping Components Using NoteState Component That Provide Context To Its Children */}
      <NoteState>
        <Navbar />
        <Alert/>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
