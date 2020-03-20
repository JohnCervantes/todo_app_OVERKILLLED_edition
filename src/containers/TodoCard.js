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
      todos: { ...this.props.data }
    };
  }

  addTodo(e) {
    e.preventDefault();
    if (this.inputElement.current.value !== "") {
      const currentData = this.state.todos;
      const currentTodos = currentData.text;
      currentTodos[
        Object.keys(currentData.text).length
      ] = this.inputElement.current.value;
      const updatedData = { ...currentData, text: currentTodos };
      axios
        .patch(`todos/${updatedData.key}.json`, {
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
    console.log(index);

    axios
      .delete("todos/" + key + "/text/" + index + ".json")
      .then(res => {
        axios
          .get("todos/" + key + ".json")
          .then(ress => {
            const currentData = this.state.todos;
            const text = ress.data.text;
            this.setState({
              todos: { ...currentData, text: text }
            });
          })

          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const key = this.state.todos.key;
    const todos = Object.keys({ ...this.state.todos.text }).map(todo => {
      if (todo !== "text0") {
        return (
          <div>
            <Todo
              text={this.state.todos.text[todo]}
              delete={this.deleteTodo.bind(this, key, todo)}
            ></Todo>
          </div>
        );
      }
    });

    // this.state.todos.text.length > 1 ? (
    //   <div>
    //     {this.state.todos.text.slice(1).map(todo => {
    //       if (todo !== null) {
    //         return (
    //           <Todo
    //             text={todo.text}
    //             delete={this.deleteTodo.bind(this, key, todo.counter)}
    //             disabled={this.state.deleteReceived}
    //           ></Todo>
    //         );
    //       }
    //     })}
    //   </div>
    // ) : (
    //   <p>You don't have any todos</p>
    // );

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
