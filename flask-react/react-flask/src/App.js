import React, { useEffect, useState} from 'react'
import './App.css'
import axios from 'axios';
import Nav from './components/Nav'
import Home from './components/Home'
import Todo from './components/Todo'
import { v4 as uuidv4 } from 'uuid';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'



function App() {

  const [todos, setTodos] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [textTodo, setTextTodo] = useState("")

  const [search, setSearch] = useState("");


  

  const getTodo = () => {
    const url = "http://localhost:5000/accounts"
    axios.get(url).then(response => {
      setTodos(response.data)
      setisLoading(false)
    })
  }

  const deleteTodo = (uid) => {
    const url = `http://localhost:5000/accounts/${uid}`

    const newTodos = todos.filter(todos => todos.uid !== uid)
    axios.delete(url)
      .then(response => {
        setTodos(newTodos)
      }).catch(err => {
        console.error(err)
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/accounts"
    const toApi = {
      "uid": uuidv4(),
      "text": textTodo,
      "completed": true,
      "user_id": 5,
    }

    axios({
      method: "POST",
      url: url,
      data: toApi,
    }).then(response => {
      setTodos([toApi, ...todos])
      setTextTodo("")
    })
  }

  const Search = () => {
    const searching = todos.find(finder => finder.text === "Zinc");
    setTodos(searching)
  }

  useEffect(() => {
    getTodo();
  }, [])

  console.log(todos.find(finder => finder.text === "Zinc"))

  return (
    <div className="container">


      
      <Router>
        <Nav searching={ Search } setTextTodo={setTextTodo} textTodo={textTodo} handleSubmit={handleSubmit}  search={search} setSearch={setSearch} />
        {/* <div id="post" className={alert == 'success' ? "alert alert-success": "alert alert-danger"} role="alert" style={{ display: display }} >
          Success updated!
        </div> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/todolist">
            {isLoading ? "Loading..." : <Todo todos={todos} deleteTodo={deleteTodo} />}
          </Route>
        </Switch>
      </Router>
      








    </div>
  )
}

export default App
