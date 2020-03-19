import React from "react";

const Input = props => (
  <input
    type={props.type}
    className={props.className}
    name={props.name}
    placeholder={props.placeholder}
    onChange={props.onChange}
  />
);

export default Input;
