import React, {useCallback, useRef} from "react";
import '@/example/todo/App.css'
import {Modal} from "@/example/todo/todoModal/modal.jsx";

export const EditModal = (props) => {
    const { data, enableEditModal, submitEditTodo, closeModal } = props

    const contentRef = useRef(null)
    const completedRef = useRef(null)

    const submit = useCallback(() => {
        let modify = {
            content: contentRef.current.value,
            completed: completedRef.current.checked,
        }
        if (modify.content.trim()) {
            submitEditTodo(data.id, modify)
            closeModal()
        } else {
            contentRef.current.value = ''
            alert("待办内容不能为空")
        }
    })

    return (
        <>
            <Modal enableModal={enableEditModal} title={"编辑待办"}>
                <p>待办内容:</p>
                <textarea defaultValue={data.content} ref={contentRef}></textarea>
                <p>
                    待办状态:
                    <input type={"checkbox"} defaultChecked={data.completed} ref={completedRef}/>
                </p>

                <button onClick={submit}>确认</button>
                <button onClick={closeModal}>取消</button>

            </Modal>
        </>
    )
}