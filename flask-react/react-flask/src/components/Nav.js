import React from 'react'
import { Link } from 'react-router-dom'

function Nav({ setTextTodo, textTodo, handleSubmit, setSearch, search, searching}) {
    return (
        <div className="div-nav">
            <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                    <li><Link to="/todolist">List</Link></li>
                    <li style={{ float: "right" }}>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="Add">Add Todo</label>
                            <input text="text" name="add" onChange={(e) => setTextTodo(e.target.value)} value={textTodo} />
                            <button type="submit">Submit</button>
                        </form>
                    </li>

                    <li>
                        <form onSubmit={searching}>
                            <label htmlFor="Add">Search</label>
                            <input text="text" name="search" onChange={(e) => setSearch(e.target.value)} value={search}/>
                            <button type="submit">Seach</button>
                        </form>
                    </li>
            </ul>
        </nav>
        </div>
        
    )
}

export default Nav
