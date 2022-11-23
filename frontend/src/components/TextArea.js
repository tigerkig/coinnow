import React from "react";

const TextArea = ({ className = "", name, value, placeholder, onChange }) => {
  return (
    <div>
      <textarea
        name={name}
        className={`${className} bg-[#0C0C0C] text-white`}
        defaultValue={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
