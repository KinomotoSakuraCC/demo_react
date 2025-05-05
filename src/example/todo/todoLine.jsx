import React, {useCallback, useRef} from "react";
import '@/example/todo/App.css'

export const TodoLine = (props) => {
    const { data } = props
    const { onSwitchCompleted, onViewTodo, onEditTodo, deleteTodo } = props

    return (
        <>
            <li className="todo-line">
                <input type={"checkbox"} checked={data.completed}
                       onChange={() => onSwitchCompleted(data.id)}  /*todo my idea：calls function to execute in a method*/
                />
                <span className="todo-line content" style={{textDecoration: data.completed ? 'line-through' : 'none'}}>
                    {data.content}
                </span>
                <div className="todo-line button-group">
                    <button className="todo-line button-group view" onClick={() => onViewTodo(data.id)}>查看</button>
                    <button className="todo-line button-group edit" onClick={() => onEditTodo(data.id)}>编辑</button>
                    <button className="todo-line button-group delete" onClick={() => deleteTodo(data.id)}>删除</button>
                </div>
            </li>
        </>
    )
}