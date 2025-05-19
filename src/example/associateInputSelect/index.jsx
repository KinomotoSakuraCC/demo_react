import React, {use, useCallback, useEffect, useState} from 'react';
import {AssociateMultiInputSelect} from "@/example/associateInputSelect/AssociateMultiInputSelect.jsx";

export const App = () => {
    const [values, setValues] = useState([]);
    const [optionalValues, setOptionalValues] = useState([]);

    useEffect(() => {
        setOptionalValues(['01234567890', 'abc', 'INFO', 'WARN', 'ERROR', 'haha', 'QuQ', 'Ouo', '  space around  ', 'this is a txt', '  ', 'space before and after  ']);
        setValues(['hello']);
    }, []);

    return (
        <>
            <div style={{width: '400px', height: '50px', position: 'absolute', top: '0', backgroundColor: 'white'}}>
                <AssociateMultiInputSelect
                    values={values}
                    updateValues={(newValues) => setValues(newValues)}
                    optionalValues={optionalValues}
                />
            </div>

        </>
    );
};