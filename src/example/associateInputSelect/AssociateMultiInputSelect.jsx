/**
 * 一个受控的可输入可选择的文本框组件
 * 支持多文本输入及联想下拉选择
 * 支持自定义校验规则
 * 不允许输入空白，去重（外部）
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './associateMultiInputSelect.css';

export const AssociateMultiInputSelect = ({ values, updateValues, optionalValues,
        validator = validateRule, invalidMessage = validateMessage, style
}) => {

    const width = style?.width ?? '100%';
    const height = style?.height ?? '100%';

    // 选中的值
    const [selectedValues, setSelectedValues] = useState([]);
    // 下拉列表中的所有值
    const [completedValues, setCompletedValues] = useState([]);
    // 输入值后联想过滤的下拉列表值
    const [filteredValues, setFilteredValues] = useState([]);
    // 输入的值（受控组件意味着输入字段的值被React状态控制）
    const [inputValue, setInputValue] = useState('');
    // 下拉列表可见状态
    const [dropdownVisible, setDropdownVisible] = useState(false);
    // 无效提示
    const [invalidTip, setInvalidTip] = useState('');

    const formatValues = useMemo(() => (
        formatRule(values)
    ), [values]);

    const formatOptionalValues = useMemo(() => (
        formatRule(optionalValues)
    ), [optionalValues]);

    useEffect(() => {
        console.log('selected', formatValues);
        setSelectedValues(formatValues);
    }, [formatValues]);

    // 组件加载时，设置下拉列表的所有值（已去重）
    useEffect(() => {
        const completedValues = [...new Set([...formatValues, ...formatOptionalValues])];
        setCompletedValues(completedValues);
    }, [formatValues, formatOptionalValues]);

    useEffect(() => {
        const filteredValues = associateRule(inputValue, completedValues).sort();
        console.log('filters',filteredValues);
        setFilteredValues(filteredValues);
    }, [inputValue, completedValues]);

    // 校验
    useEffect(() => {
        if (validator(selectedValues) && validator([inputValue])) {
            setInvalidTip('');
        } else {
            setInvalidTip(invalidMessage);
        }
    }, [selectedValues, inputValue, validator, invalidMessage]);

    // 输入框值变化时
    const handleInputChange = (event) => {
        console.log('onChange', event.target.value);
        const value = event.target.value;
        setInputValue(value);
    };

    // 输入框按下回车时
    const handleInputKeyDown = (event) => {
        console.log('onKeyDown', event.key);
        if (event.key === 'Enter') {
            event.preventDefault();
            // 去重，跳过空白
            if (!inputValue.trim()) {
                setInputValue('');
                return;
            }
            if (selectedValues.includes(inputValue.trim())) {
                // do nothing
                return;
            }
            const newSelectedValues = [...selectedValues, inputValue];
            updateValues(newSelectedValues);
            setInputValue('');
        }
    };

    // 点击下拉列表中的值时
    const handleDropdownItemClick = (valueParam) => {
        if (selectedValues.includes(valueParam)) {
            // 取消选中
            const newSelectedValues = selectedValues.filter(item => item !== valueParam);
            updateValues(newSelectedValues);
        } else {
            // 选中
            const newSelectedValues = [...selectedValues, valueParam];
            updateValues(newSelectedValues);
            if (inputValue === valueParam) {
                setInputValue('');
            }
        }
    };

    // 点击下拉列表外部时

    // 输入框失去焦点时

    const handleClear = () => {
        updateValues([]);
    };

    return (
        <>
            <div
                className={invalidTip ? 'risk-border' : 'common-border'}
                style={{width: width, height: height}}
            >
                {/* 已选值 */}
                <div style={{color: 'black', fontSize: '12px', marginBottom: '5px',
                        whiteSpace: 'pre-wrap', wordBreak: 'break-all'}} >
                    {selectedValues.join(', ')}
                </div>
                {/* 输入框 */}
                <input
                    className='input'
                    type='text'
                    value={inputValue}  // 不能同时拥有value和defaultValue
                    onChange={handleInputChange}    // 初步看等同于 onInput
                    onKeyDown={handleInputKeyDown}
                    placeholder='请输入文本'
                    autoComplete='on'
                    readOnly={false}
                    disabled={false}
                    onFocus={() => setDropdownVisible(true)}    // onBlur时不能设置下拉列表隐藏
                />
                {/* 下拉菜单 */}
                <div>
                    {dropdownVisible && filteredValues.length > 0 && (
                        <ul className='dropdown'>
                            {filteredValues.map((value, index) => (
                                <li
                                    key={index}
                                    className='dropdown-item'
                                    onClick={() => handleDropdownItemClick(value)}
                                    style={{color: selectedValues.includes(value) ? 'yellow' : 'white',
                                        whiteSpace: 'pre'}}
                                >
                                    {value}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

// 去重，过滤空白
const formatRule = (valuesParam) => {
    if (!valuesParam) {
        return [];
    }
    return [...new Set(valuesParam.map(value => value.trim()).filter(value => value))];
    // valuesParam.map(value => value.trim()).filter(value => value).filter((value, index, self) => self.indexOf(value) === index);
};

// 自定义联想规则
const associateRule = (inputParam, valuesParam) => {
    const values = valuesParam ?? [];
    if (!inputParam || !inputParam.trim()) {
        return values;
    }
    const trimInput = inputParam.trim();
    const filtered = values.filter(item => item.toLowerCase().includes(trimInput.toLowerCase()));
    if (!filtered.includes(trimInput)) {
        filtered.unshift(trimInput);
    }
    return filtered;
};

// 非法提示
const validateMessage = '输入的文本不合法';

// 自定义校验规则
const validateRule = (valuesParam) => {
    const regExp = new RegExp(',');
    const maxLength = 256;
    const maxSum = 10;
    const values = valuesParam ?? [];
    let sum = 0;
    for (const value of values) {
        const trimValue = value.trim();
        if (!trimValue) {
            console.log('校验: 空文本, skipped');
            continue;
        }
        if (trimValue.length > maxLength) {
            console.log(`校验: 单文本的长度不能超过${maxLength}`, value);
            return false;
        }
        if (regExp.test(value)) {
            console.log('校验: 文本中不能包含逗号', value);
            return false;
        }
        sum += 1;
        if (sum > maxSum) {
            console.log(`校验: 文本的数量不能超过${maxSum}`, values);
            return false;
        }
    }
    return true;
};

/*
* 验证
* 1. 输入的文本可以带空格
* 2. 首尾有空白，依然可以联想
* */