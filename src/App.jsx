import React, { useEffect } from 'react'
import Home from './components/pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/pages/Login/Login'
import Player from './components/pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
       if(user){
        console.log("loged in");
        navigate('/');
       }else{
        console.log("logged out");
        navigate('/login')
       }
    })
  },[]) 


  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes> 
           <Route path='/'  element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App