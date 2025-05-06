import React, {useCallback, useState} from "react";
import "@/example/multiInput/MultiValueBlockInput.css";

export const MultiValueBlockInput = () => {
    const [values, setValues] = useState([]);
    const [current, setCurrent] = useState('');

    const addValue = useCallback(() => {
        if (!current.trim()) {
            alert("this value is empty");
            setCurrent('');
            return;
        }
        if (values.includes(current.trim())) {
            alert("this value already exists");
            setCurrent('');
            return;
        }
        setValues((prev) => [...prev, current.trim()]);
        setCurrent('');
    }, [current, values]);

    const removeValue = useCallback((index) => {
        let update = values.filter((_, i) => i !== index);
        setValues(update);
    }, [values]);   /* todo 这里需要添加values依赖，因为callback缓存的是计算结果，初始为空，要以计算值而不是函数视角去看 */

    const handleKeyDown = useCallback((event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // 阻止默认行为
            addValue();
        }
    }, [addValue]);

    const handleInputChange = useCallback((event) => {
        let value = event.target.value;
        setCurrent(value);
    }, []);

    return (
        <>
            <div className="multi-value-block-input">
                <div className="block-container">
                    {values.map((value, index) => (
                        <div key={index} className="value-block">
                            {value}
                            <span
                                className="remove-button"
                                onClick={() => {removeValue(index)}}
                            >
                                &times;
                            </span>
                        </div>
                    ))}
                    <input
                        className="input-field"
                        type="text"
                        placeholder="press enter after typing to confirm"
                        value={current}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </>
    )
}