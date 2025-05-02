import React, {useContext, useReducer} from "react";

const StudentContext = React.createContext({});

export const StudentContextWrapper = (props) => {
    const defaultState = {name: 'sakura', age: 18.2}

    const initAction = (state) => {
        return { ...state, age: Math.round(state.age) }
    }

    const reducer = (prevState, action) => {
        switch (action.type) {
            case 'UPDATE_NAME':
                /*返回新对象的引用以触发状态更新而重新渲染*/
                return { ...prevState, name: action.payload }
            case 'INCREMENT':
                return { ...prevState, age: prevState.age + action.payload }
            case 'DECREMENT':
                return { ...prevState, age: prevState.age - action.payload }
            case 'RESET':
                return initAction(defaultState)
            default:
                return prevState
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultState, initAction)

    return (
        <StudentContext.Provider value={{student: state, dispatch}}>
            {props.children}
        </StudentContext.Provider>
    )
}

/*
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { StudentContextWrapper, Father } from '@/simpleMousePosition/simpleUseContext.jsx'

createRoot(document.getElementById('root')).render(
    <StudentContextWrapper>
        <Father />
    </StudentContextWrapper>
)
*/

export const Father = () => {
    const studentContext = useContext(StudentContext)

    const changeName = () => {
        studentContext.dispatch({ type: 'UPDATE_NAME', payload: studentContext.student.name === 'sakura' ? 'sakuraNew' : 'sakura' })
    }

    return (
        <div>
            <h1>Student name: {studentContext.student.name} age: {studentContext.student.age}</h1>
            <button onClick={changeName}>Change name</button>
            <hr />
            <Son1></Son1>
            <Son2></Son2>
        </div>
    )
}

const Son1 = () => {
    const { student, dispatch } = useContext(StudentContext)

    return (
        <div style={{display: 'inline-block', float: 'left'}}>
            <h2>{JSON.stringify(student)}</h2>
            <button onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}>increase age</button>
        </div>
    )
}

const Son2 = () => {
    const { student, dispatch } = useContext(StudentContext)

    return (
        <div style={{display: 'inline-block', float: 'right'}}>
            <h2>{JSON.stringify(student)}</h2>
            <button onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}>decrease age</button>
            <GrandSon />
        </div>
    )
}

const GrandSon = () => {
    const { dispatch } = useContext(StudentContext)

    return (
        <div>
            <hr />
            <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        </div>
    )
}