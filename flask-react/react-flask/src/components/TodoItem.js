import React from 'react';

function TodoItem({ todos, deleteTodo }) {
    return (
        <div className="todo-items">
            <div className="flex">  
                <div>{todos.text}<button onClick={() => deleteTodo(todos.uid)} className="btn btn-primary btn-xs">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default TodoItem
