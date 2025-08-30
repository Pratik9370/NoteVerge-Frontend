import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoteState from './context/notes/NoteState.jsx';
import Login from './components/Login.jsx';
import { getCookie } from './utils/getCookie.js'
import Signup from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import NoteDetails from './components/NoteDetails.jsx';
import EditNote from './components/EditNote.jsx';


function App() {

  const [token, setToken] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('http://localhost:3000/api/auth/getUser', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("token")}`
        },
        credentials: "include"
      })
      if (!response.ok) {
        return new Error("Failed to fetch user data");
      }
      const text = await response.text(); // Await response text
      setToken(text)
    }
    getUser()
  }, [])


  return (
      <NoteState>
        <Router>
          {token ? (
            <>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/note/:id" element={<NoteDetails />} />
                <Route exact path="/editNote/:id" element={<EditNote />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Signup />} />
              <Route path='/forgotPassword' element={<ForgotPassword/>} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}

          


        </Router>
      </NoteState>
  )
}

export default App
