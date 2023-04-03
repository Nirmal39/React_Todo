import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';

function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);



  const submitHandler = async (e) =>{
    e.preventDefault();
    setLoading(true)
    try {
      const {data} = await axios.post(`${server}/users/login`,{
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
      setLoading(false)
      setIsAuthenticated(false)
      
      
    }

  };

  if(isAuthenticated) return <Navigate to={'/'} />


  return loading ? <Loader/> : (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
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
          <button disabled={loading} type='submit'>Login</button>
          <h4>Or</h4>
          <Link to={"/register"}>Sign Up</Link>
        </form>
      </section>
    </div>
    )
}

export default Login