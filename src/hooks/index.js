import {useEffect, useState} from "react";

export const useMousePosition = (delay = 500) => {
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        let timer = null

        const mousemoveHandler = (event) => {
            if (timer !== null) return
            // 给timer赋一个值
            timer = setTimeout(() => {
                console.log(event.clientX, event.clientY)
                setPosition({x: event.clientX, y: event.clientY})
                timer = null
            }, delay)
        }

        window.addEventListener("mousemove", mousemoveHandler)

        // 组件卸载时移除事件监听，否则可能出现多个监听
        return () => window.removeEventListener("mousemove", mousemoveHandler)
    }, []);

    return position
}