import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 text-sm font-medium rounded-lg
        bg-green-600 text-white
        hover:bg-green-700
        disabled:opacity-50 disabled:cursor-not-allowed
        transition
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
