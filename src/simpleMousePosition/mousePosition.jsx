import React, {useEffect, useState} from "react";
import {useMousePosition} from "@/hooks/index.js";

const MousePosition = () => {
    const position = useMousePosition(100)

    return (
        <>
            <p>mouse position: {JSON.stringify(position)}</p>
        </>
    )
}

export const TestMousePosition = () => {
    const [show, setShow] = useState(true)

    return (
        <>
            <button onClick={() => setShow((prev) => !prev)}>Toggle</button>
            <hr />
            {show && <MousePosition />}
        </>
    )
}