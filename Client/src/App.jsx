import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Logout from './Pages/Logout'
import AddAssistantName from './Pages/AddAssistantName'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/assistant' element={<AddAssistantName />} />
      </Routes>
    </BrowserRouter>
  )
}
