import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './features/login/Login';
import Signup from './features/signup/Signup';
import { useDispatch, useSelector } from 'react-redux';
import Home from './features/home/Home';

function App() {
  const currentUser = useSelector(state => state.currentUser.value)
  const dispatch = useDispatch()
  const navigation = useNavigate()
  
  useEffect(() => {
    fetch('/auth')
    .then(r => r.json())
    .then(data => {
      if (data){
        dispatch({type:'currentUser/login', payload:data})
      } 
    })
  },[dispatch])
  
  
  
  if (!currentUser){
    return (
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path='/home' element={<Home />}/>
      </Routes>
    )
  }
}

export default App;
