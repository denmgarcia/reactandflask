import React from 'react'
import TodoItem from '../components/TodoItem'



function Todo({ todos, deleteTodo }) {
    return (
        <div className="todo">
            { todos.map((todo) => {
                return <TodoItem key={todo.uid} todos={todo} deleteTodo={deleteTodo} /> 
            })}
        </div>
    )
}

export default Todo
