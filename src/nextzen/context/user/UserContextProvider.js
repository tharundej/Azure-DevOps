import React,{useState} from 'react'

import UserContext from './UserConext'


const UserContextProvider = ({children}) => {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem("userDetails")))
    console.log(JSON.parse(localStorage.getItem("userDetails")),'localStorage.getItem("userDetails")')
  return (
   
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
   
  )
}

export default UserContextProvider