import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Admin from './Components/Admin';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </>
  )
}

export default App