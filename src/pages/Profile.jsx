import React, { useContext, useEffect} from 'react'
import { Context } from '../main';
import { Navigate } from 'react-router-dom';


function Profile() {
  const {isAuthenticated,users,setUsers} = useContext(Context);
  
  if(!isAuthenticated) return <Navigate to={'/login'} />

  

  useEffect(() => {
    setUsers(users)
  }, []);


  

  return (
      <div>
        <h1>{users?.name}</h1>
        <p>{users?.email}</p>
      </div>
    )
}

export default Profile