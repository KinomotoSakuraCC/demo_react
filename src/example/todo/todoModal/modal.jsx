import React from "react";
import '@/example/todo/App.css'

export const Modal = (props) => {
    const { enableModal, title } = props
    const { children } = props

    return (
        <>
            {enableModal && (
                <div className="todo-modal">
                    <div className="todo-modal header">
                        {title}
                    </div>
                    <hr />
                    <div className="todo-modal content-wrapper">
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}