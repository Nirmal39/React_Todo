import  React,{ useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/app.scss'
import {createContext} from "react"


export const server = "https://nodejs-todoapp-ogur.onrender.com/api/v1"

export const Context = createContext({ isAuthenticated: false });


const AppWrapper = () =>{
  
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState(false);
  const [users,setUsers] = useState({});


  return (
    <Context.Provider value={{
      isAuthenticated, 
      setIsAuthenticated,
      loading,
      setLoading,
      users,
      setUsers
  }}>
    <App />
  </Context.Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>
);
