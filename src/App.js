import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './components/Form';
import Scanner from './components/Scanner';
import Login from './components/Login'
import Protected from './components/Protected'
import { AuthProvider } from './components/auth'
import Middleman from './components/Middleman'
import View from "./components/View";
import QrCodeGenerator from './components/QrCodeGenerator';
import Success from './components/Success'

function App() {
  useEffect(() => {
    document.title = 'Food Form';
  }, []);
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />}  />
        <Route path='/Middle' element={<Protected>
          <Middleman />
          </Protected>}  />
        <Route path='/Login' element = {<Login />} />
        <Route path='/View' element={
          <Protected><View /></Protected>}  />
        <Route path='/Scan' element={<Protected><Scanner /></Protected>}  />
        <Route path='/QR' element={<QrCodeGenerator />}  />
        <Route path='/Success' element={<Success />}  />


      </Routes>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App