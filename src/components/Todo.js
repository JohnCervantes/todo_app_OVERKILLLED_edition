import React from "react";

const Todo = props => {
  return <li onClick={props.delete}>{props.text}</li>;
};

export default Todo;
