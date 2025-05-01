import {useCountDown, useMousePosition} from "@/hooks/index.js";

export const ReadAgreement = () => {
    const [count, disabled] = useCountDown();

    return (
        <>
            <button disabled={disabled} onClick={() => console.log('Confirmed agreement')}>
                {disabled ? `Please read agreement (${count}s)` : 'Please confirm agreement'}
            </button>
        </>
    )
}