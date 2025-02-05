import React from "react";

const LoginButton = ({ onClick, className, text, disabled, onKey }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick()
        }
      }}
      disabled={disabled}
      className={`${className} w-full h-12 mt-10 rounded-lg cursor-pointer font-bold`}
    >
      {text}
    </button>
  );
};

export default LoginButton;
