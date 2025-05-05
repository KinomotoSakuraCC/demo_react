import React from "react";
import '@/example/todo/App.css'
import {Modal} from "@/example/todo/todoModal/modal.jsx";
import {formatDate} from "@/example/todo/libs/utils.js";

export const ViewModal = (props) => {
    const { data, enableViewModal, closeModal } = props

    return (
        <>
            <Modal enableModal={enableViewModal} title={"查看待办"}>
                <p>编辑时间: {formatDate(data.id)}</p>
                <p>待办内容: {data.content}</p>
                <p>待办状态: {data.completed ? "已完成" : "未完成"}</p>
                <button onClick={closeModal}>确认</button>
            </Modal>
        </>
    )
}