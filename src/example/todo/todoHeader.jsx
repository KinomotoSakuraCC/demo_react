import React from "react";
import '@/example/todo/App.css'

export const TodoHeader = (props) => {
    const { onSwitchInput } = props

    return (
        <>
            <div className="todo-header">
                <span className="todo-header title">待办清单</span>
                <span className="todo-header add" onClick={onSwitchInput}>&#43;</span>
            </div>
        </>
    )
}