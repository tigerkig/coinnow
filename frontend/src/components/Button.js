import React from "react";

const Button = ({ onClick, color, text, className = "", type = "button" }) => {
  return (
    <button
      className={`${className} bg-[${color}] rounded-[13px] text-white text-[32px]`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
