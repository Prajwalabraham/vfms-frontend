import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './components/Form';
import Scanner from './components/Scanner';
import Login from './components/Login'
import Protected from './components/Protected'
import { AuthProvider } from './components/auth'
import Middleman from './components/Middleman'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />}  />
        <Route path='/Middle' element={<Middleman />}  />
        <Route path='/Login' element = {<Login />} />
        <Route path='/Scan' element={<Scanner />}  />
      </Routes>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App