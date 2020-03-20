import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Todo from "../components/Todo";
import axios from "../axios-todos";

class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = {
      todos: []
    };
  }

  addTodo(e) {
    e.preventDefault();
    if (this.inputElement.current.value !== "") {
      const fetchedData = this.props.data;
      const currentTodos = fetchedData.text;
      currentTodos.push(this.inputElement.current.value);
      const updatedData = { ...fetchedData, text: currentTodos };
      axios
        .patch(`/todos/${updatedData.key}.json`, {
          title: updatedData.title,
          text: updatedData.text
        })
        .then(res => {
          this.setState({ todos: updatedData });

          this.inputElement.current.value = "";
          this.inputElement.current.focus();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  deleteTodo = (key, index) => {
    axios
      .delete("/todos/" + key + "/" + index + ".json")
      .then(res => {
        const currentData = this.props.data;
        const oldTodos = [...currentData.text];
        const updatedTodos = oldTodos.filter(element, index) => {
          return element !== index;
        });
        const updatedData = { ...currentData, updatedTodos };
        console.log(updatedData);
        this.setState({ todos: updatedData });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const todos =
      this.props.data.text.length > 1 ? (
        <div>
          {this.props.data.text.slice(1).map((todo, index = 1) => {
            return (
              <Todo
                text={todo}
                delete={this.deleteTodo.bind(this, todo.index, index)}
              ></Todo>
            );
          })}
        </div>
      ) : (
        <p>You don't have any todos</p>
      );

    return (
      <Card style={{ width: "20%", display: "inline-block", margin: "30px" }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {this.props.data.title}
          </Typography>
          <Typography variant="h5" component="h2">
            <ul>{todos}</ul>
            <form onSubmit={this.addTodo.bind(this)}>
              <input
                placeholder="Add todo here"
                type="text"
                ref={this.inputElement}
              />
              <button type="submit">Add</button>
            </form>
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={this.props.delete} size="small">
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default TodoCard;

//   componentDidMount() {
//     const fetchedData = [];
//     axios
//       .get("/todos.json")
//       .then(res => {
//         for (let key in res.data) {
//           fetchedData.push({ ...res.data[key], key: key });
//         }
//         this.setState({ todos: fetchedData, dataReceived: true });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
