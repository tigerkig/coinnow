import React from "react";

const TextInput = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  label,
}) => {
  return (
    <div className="w-full">
      {label && <label className="text-white text-[32px]">{label}</label>}
      <input
        className={`w-full bg-[#0C0C0C] text-white pl-5 ${className}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
