import React, {useCallback, useRef} from "react";
import '@/example/todo/App.css'

export const TodoInput = (props) => {
    const { enableInput } = props
    const { addTodo } = props

    /*通过React的useRef钩子创建的一个引用对象，用于直接访问DOM元素或保存可变值，而无需触发组件重新渲染*/
    const inputRef = useRef(null);

    const onSubmitTodo = useCallback(() => {
        /**
         * @type {string}
         */
        let value = inputRef.current.value
        if (value.trim()) {
            addTodo(value)                /*提供一个按钮点击事件的处理逻辑，用于将用户输入的待办事项添加到列表中*/
        } else {
            alert('请输入待办事件')    /*如果输入框为空，则弹出提示框*/
        }
        inputRef.current.value = ''     /*清空输入框的值*/
    }, [addTodo])   /*添加addTodo作为依赖项，以确保在addTodo函数变化时重新创建onSubmitTodo函数*/

    return (
        <>
            {enableInput && (
                <div className="todo-input">
                    <input type={"text"} placeholder={"请输入待办事件"} ref={inputRef} />
                    <button onClick={onSubmitTodo}>添加</button>
                </div>
            )}
        </>
    )
}