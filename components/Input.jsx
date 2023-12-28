import React from "react";

const Input = ({ hint, type, handler, value, name, classes }) => {
  return (
    <input
      type={type}
      placeholder={hint}
      value={value}
      onChange={handler}
      name={name}
      autoComplete="off"
      className={`outline-none border-2 w-full border-gray-200 focus:border-gray-400 transition-all duration-200 px-4 py-2 rounded-md ${classes}`}
    />
  );
};

export default Input;
