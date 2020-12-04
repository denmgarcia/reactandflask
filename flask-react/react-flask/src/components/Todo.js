import React, { useContext } from 'react'
import { MyAppProvider } from '../App'
import TodoItems from './TodoItems'

function Todo() {
    const todos = useContext(MyAppProvider)
    console.log(todos.getTodo)
    return (

        <div className="todo">
            { todos.map((todo) => {
                return <TodoItems key={ todo.uid } todo={todo} />
            })}
            
        </div>
    )
}

export default Todo
