'use client'

import { useState } from 'react'

const LoginInput = ({ onChange, onKeyDown, inputValue, setInputValue, inputRef, className, disabled, inputClassName, id }) => {
    const [type, setType] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0);
    const [blur, setBlur] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <input
                id={id}
                disabled={disabled}
                ref={inputRef}
                value={inputValue}
                onClick={(e) => setCaretPosition(e.target.selectionStart)}
                onBlur={() => setBlur(true)}
                onChange={(e) => {
                    setInputValue(e.target.value.replace(/ /, ''))
                    setCaretPosition(e.target.selectionStart)
                    onChange && onChange()
                }}
                onKeyDown={(e) => {
                    onKeyDown && onKeyDown(e)
                    setTimeout(() => {
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                            setCaretPosition(inputRef.current.selectionStart);
                        }
                    }, 0);
                }}
                onFocus={() => {
                    if (blur) {
                        return
                    } else {
                        setTimeout(() => {
                            inputRef.current.selectionStart = caretPosition;
                            inputRef.current.selectionEnd = caretPosition;
                        }, 0)
                        setBlur(false)
                    }
                }}
                dir="ltr"
                className={`${inputClassName} font-['vazir'] w-full h-12 pl-4 pr-14 rounded-lg border-solid border-[1px] ${inputValue === '' ? 'border-default-300' : 'border-tertiary'} ${type ? '' : 'text-xl'}`}
                type={!type ? 'password' : 'text'}
            />
            <span
                onClick={() => {
                    if (inputRef.current.value !== '') {
                        setType(!type);
                        const currentPosition = inputRef.current.selectionStart;
                        setTimeout(() => {
                            setCaretPosition(currentPosition);
                            inputRef.current.selectionStart = currentPosition;
                            inputRef.current.selectionEnd = currentPosition;
                        }, 0);
                    }
                }}
                onMouseDown={(e) => {
                    if (e.target.tagName !== 'INPUT') {
                        e.preventDefault();
                    }
                }}
                onTouchStart={(e) => {
                    if (e.target.tagName !== 'INPUT') {
                        e.preventDefault();
                    }
                }}
                className={`cursor-pointer absolute top-[50%] translate-y-[-50%] right-4 text-2xl ${inputValue === '' ? 'icon-light-linear-Show-empty' : type ? 'icon-light-outline-Hide' : 'icon-light-linear-Show'}`}></span>
        </div>
    )
}

export default LoginInput