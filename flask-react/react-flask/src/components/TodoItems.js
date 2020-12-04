import React, { useContext} from 'react'
import { MyAppProvider } from '../App'

function TodoItems({ todo, getDeleteList }) {

    // const {setDelete} = useContext(MyAppProvider)

    return (
        <div className="todo-items">
            <div style={{ float: "left", marginRight: "100px" }}>{ todo.text }</div>
            <div style={{ float: "right" }}><button onClick={ () => getDeleteList(todo.uid)} className="btn btn-danger">Delete { todo.uid }</button></div>
        </div>
    )
}

export default TodoItems
