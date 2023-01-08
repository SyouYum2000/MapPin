import Room from '@mui/icons-material/Room'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import "./Register.css"

const Register = ({setShowRegister}) => {

  const [success,setSuccess] = useState(false)
  const [error,setError] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async(e) =>{
   e.preventDefault();
   const newUser = {
    username:nameRef.current.value,
    email:emailRef.current.value,
    password:passwordRef.current.value,
   };
   try{
    await axios.post("/users/register",newUser)
    setSuccess(true);
    setError(false)
   } catch(err){
    console.log(err);
    setError(true)
    setSuccess(false)
   }
  }

  return (
    <div className='registerContainer'>
      <div className='logo'>
        <Room/>
        Mappin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' ref={nameRef}/>
        <input type="email" placeholder='email' ref={emailRef}/>
        <input type="password" placeholder='password' ref={passwordRef}/>
         <button className='registerBtn'>Register</button>
         {success &&
          <span className='success'>Success !! </span>
         } {error &&
          <span className='failure'>Wrong !! </span>
         }
      </form>
       <IconButton>
        <CancelIcon className='registerCancel' onClick={()=>setShowRegister(false)}/>
       </IconButton>
    </div>
  )
}

export default Register