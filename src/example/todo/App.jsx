import React, {useCallback, useEffect, useState} from "react";
import '@/example/todo/App.css'
import {TodoHeader} from "@/example/todo/todoHeader.jsx";
import {TodoInput} from "@/example/todo/todoInput.jsx";
import {docs_todoList} from "@/example/todo/docs/data.js";
import {TodoLine} from "@/example/todo/todoLine.jsx";
import {ViewModal} from "@/example/todo/todoModal/viewModal.jsx";
import {EditModal} from "@/example/todo/todoModal/editModal.jsx";

export const App = () => {
    const [enableInput, setEnableInput] = useState(false)
    const [todoList, setTodoList] = useState([])
    const [currentTodo, setCurrentTodo] = useState({})
    const [enableViewModal, setEnableViewModal] = useState(false)
    const [enableEditModal, setEnableEditModal] = useState(false)

    useEffect(() => {
        setTodoList(docs_todoList)
    }, [])

    const addTodo = useCallback((content) => {
        let data = {
            id: new Date().getTime(),
            content: content,
            completed: false,
        }
        setTodoList((prev) => [...prev, data])
        setEnableInput(false)
    }, [])

    const deleteTodo = useCallback((id) => {
        setTodoList((prev) =>
            /*使用filter方法过滤掉与传入的id匹配的待办事项*/
            prev.filter((item) => item.id !== id)
        )
    }, [])

    const switchTodoCompleted = useCallback((id) => {
        setTodoList((prev) =>
            /*使用map遍历当前的todoList，找到与传入的id匹配的待办事项，并切换其completed属性的布尔值*/
            prev.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        )
    }, [])

    const openViewModal = useCallback((id) => {
        let todo = todoList.find((item) => item.id === id)
        if (todo) {
            setCurrentTodo(todo)
            setEnableViewModal(true)
        }
    }, [todoList])  /*todoList应该作为依赖添加，否则在todoList更新时，openViewModal不会重新计算，可能导致使用过期的todoList数据*/

    const openEditModal = useCallback((id) => {
        let todo = todoList.find((item) => item.id === id)
        if (todo) {
            setCurrentTodo(todo)
            setEnableEditModal(true)
        }
    }, [todoList])  /*todoList应该作为依赖添加，否则在todoList更新时，openEditModal不会重新计算，可能导致使用过期的todoList数据*/

    const submitEditTodo = useCallback((id, data) => {
        setTodoList((prev) => prev.map((item) => {
            if (item.id === id) {
                item = {id: new Date().getTime(), content: data.content, completed: data.completed}
            }
            return item
        }))
    }, [])

    return (
        <>
            <div className="todo-app">
                <TodoHeader onSwitchInput={() => setEnableInput((prev) => !prev)} />
                <hr />
                <TodoInput  enableInput={enableInput} addTodo={addTodo}/>
                <ul>
                    {!todoList.length && <div>没有待办</div>}
                    {todoList.map((item, index) =>
                        <TodoLine data={item} key={index}
                                  onSwitchCompleted={switchTodoCompleted}   /*todo my idea：relate with function*/
                                  onViewTodo={openViewModal}
                                  onEditTodo={openEditModal} submitEditTodo={submitEditTodo}
                                  deleteTodo={deleteTodo}
                        />)}
                </ul>

                {/*弹窗*/}
                <ViewModal data={currentTodo}
                           enableViewModal={enableViewModal}
                           closeModal={() => setEnableViewModal(false)} />

                <EditModal data={currentTodo}
                            enableEditModal={enableEditModal}
                            submitEditTodo={submitEditTodo}
                            closeModal={() => setEnableEditModal(false)} />
            </div>
        </>
    )
}
