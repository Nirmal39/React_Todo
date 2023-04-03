import React,{useState,useContext} from 'react'
import { Link , Navigate } from 'react-router-dom';
import axios from 'axios';
import {server} from '../main'
import toast from "react-hot-toast"
import { Context } from '../main'

function Register() {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);



  const submitHandler = async (e) =>{
    setLoading(true)
    e.preventDefault();

    try {
      const {data} = await axios.post(`${server}/users/new`,{
        name,
        email,
        password
      },{
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
  
      toast.success(data.message) 
      setIsAuthenticated(true);
      setLoading(false)
      
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false)
      setLoading(false)

    }

  };

  if(isAuthenticated) return <Navigate to={'/'} />

  return (
    <div className='login'>
    <section>
      <form onSubmit={submitHandler}>
        <input 
        type="text"
        placeholder='Name' 
        onChange={(e)=>setName(e.target.value)}
        value={name}
        required
        />
        <input 
        type='email' 
        placeholder='Email' 
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        required
        />
        <input 
        type='password' 
        placeholder='password' 
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        required
        />
        <button disabled={loading} type='submit'>Sign Up</button>
        <h4>Or</h4>
        <Link to={"/login"}>Login</Link>
      </form>
    </section>
  </div>
  )
}

export default Register