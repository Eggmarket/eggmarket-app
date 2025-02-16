import React from "react";

// type => 1 for primary , 2 for primary-2 3 for primary-ghost

export default function Button({
  type,
  text,
  disabled = false,
  width,
  onClick,
  loading = false,
}) {
  return (
    <button
      className={`button ${type} ${disabled ? "disabled opacity-70" : ""} ${
        loading ? "isLoading" : ""
      } ${width}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
