import axios from 'axios'
import React, {  useContext, useEffect, useState } from 'react'
import { Context, server } from '../main'
import { toast } from 'react-hot-toast'
import TodoItem from '../components/TodoItem'
import { Navigate } from 'react-router-dom'

function Home() {

  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const [loading,setLoading] = useState(false)
  const [tasks,setTasks] = useState([])
  const [refresh,setRefresh] = useState(false)

  const {isAuthenticated} = useContext(Context);


  const updateHandler = async (id)=>{
    setLoading(true)
    try {
      
      const {data} = await axios.put(`${server}/tasks/${id}`,
      {},{
        withCredentials:true
      })

      toast.success(data.message)
      setRefresh((prev) => !prev);
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false)
      
    }
    
  }

  const deleteHandler = async (id)=>{
    setLoading(true)
    try {
      
      const {data} = await axios.delete(`${server}/tasks/${id}`,
      {
        withCredentials:true
      })

      toast.success(data.message)
      setRefresh((prev) => !prev);
      setLoading(false)

    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false)
      
    }
  }

  const submitHandler = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const {data} = await axios.post(`${server}/tasks/new`,{
        title,
        description : desc
      },{
        withCredentials: true,
        headers:{
          "Content-Type" : "application/json"
        },
      });
      setTitle('')
      setDesc('')

      toast.success(data.message);
      setLoading(false)
      setRefresh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false)

    }
  };

  useEffect(()=>{
    setLoading(true)
    axios.get(`${server}/tasks/my`,{
      withCredentials: true
    })
    .then((res)=>{
      setTasks(res.data.task)
      setLoading(false)
    })
    .catch((e)=>{
      toast.error(e.response.data.message)
      setLoading(false)
    })
  },[refresh]);



  if(!isAuthenticated) return <Navigate to={'/login'}/>;

  return (
    <div className='container'>

      <div className='login'>
        <section>
          <form onSubmit={submitHandler}>
            <input 
            type='text' 
            placeholder='Title' 
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            required
            />
            <input 
            type='text' 
            placeholder='Description' 
            onChange={(e)=>setDesc(e.target.value)}
            value={desc}
            required
            />

            <button disabled={loading} type='submit'>Add Task</button>
          </form>
        </section>
      </div>

      <section className='todosContainer'>

        {
          tasks.map((i)=>(
            <TodoItem 
            title = {i.title} 
            desc = {i.description} 
            iscomp = {i.isCompleted}
            updateHandler = {updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
            >
            </TodoItem>
          ))
        }

      </section>
    </div>
  )
}

export default Home