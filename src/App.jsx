import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from './pages/Home';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";


function App() {
  const {setUsers,setIsAuthenticated,setLoading} = useContext(Context)

  useEffect(()=>{
    setLoading(true)
    axios.get(`${server}/users/me`,{
      withCredentials:true
    }).then((res)=>{
      setUsers(res.data.user);
      localStorage.setItem('user', res.data)
      setIsAuthenticated(true);
      setLoading(false)
    }).catch((error)=>{
      setUsers({});
      localStorage.setItem('user', "")
      setIsAuthenticated(false);
      setLoading(false)
    })
  },[])

  return (
    <div className="App">

      <Router>
        <Header/>
          <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/profile" element ={<Profile/>}/>
            <Route path="/login" element ={<Login/>}/>
            <Route path="/register" element ={<Register/>}/>
          </Routes>
          <Toaster/>
      </Router>

    </div>
  )
}

export default App
