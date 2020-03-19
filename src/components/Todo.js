import React from "react";
import { Card } from "react-bootstrap";

const Todo = props => {
  return (
      <Card>
        <Card.Body style={{ padding: "20px" }}>
          <Card.Text style={{ fontSize: "20px" }}>
            <ul onClick={props.delete}>{props.text}</ul>
          </Card.Text>
        </Card.Body>
      </Card>
  );
};

export default Todo;
