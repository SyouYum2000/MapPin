import axios from 'axios'
import React, { useRef, useState } from 'react'
import Room from '@mui/icons-material/Room'
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import "./Login.css"

const Login = ({setShowLogin,myStorage,setCurrentUser}) => {
    const [error,setError] = useState(false)
    const nameRef = useRef()
    const passwordRef = useRef()
  
    const handleSubmit = async(e) =>{
     e.preventDefault();
     const newUser = {
      username:nameRef.current.value,
      password:passwordRef.current.value,
     };
     try{
      const res = await axios.post("/users/login",newUser)
      myStorage.setItem("user",res.data.username)
      setCurrentUser(res.data.username)
      setShowLogin(false)
      setError(false)
     } catch(err){
      console.log(err);
      setError(true)
     }
    }

  return (
    <div className='loginContainer'>
      <div className='logo'>
        <Room/>
        Mappin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' ref={nameRef}/>
        <input type="password" placeholder='password' ref={passwordRef}/>
         <button className='loginBtn'>Login</button>
          
         {error &&
          <span className='failure'>Wrong !! </span>
         }

      </form>
       <IconButton>
        <CancelIcon className='loginCancel' onClick={()=>setShowLogin(false)}/>
       </IconButton>
    </div>
  )
}

export default Login