import React, { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home';
import axios from 'axios';


export const MyAppProvider = React.createContext()

function App() {
  const url = "http://localhost:5000/accounts"

  const [getTodo, setTodo] = useState([]);
  const [getdelete, setDelete] = useState([]);

  const getTodoList = () => {
    axios.get(url).then(response => {
      setTodo(response.data)
    })
  }

  const getDeleteList = (id) => {
   console.log("sdfsdf", id)
  }

  useEffect(() => {
    getTodoList()
  }, [])




  
  return (
    <MyAppProvider.Provider value={{ getTodo }}>
      <Home />
    </MyAppProvider.Provider>
  )

}

export default App
