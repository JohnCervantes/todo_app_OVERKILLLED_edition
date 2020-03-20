import React, { Component } from "react";
import TodoCard from "./TodoCard";
import axios from "../axios-todos";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class App extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = {
      todos: [],
      dataReceived: false
    };
  }

  deleteItem = key => {
    axios
      .delete("/todos/" + key + ".json")
      .then(res => {
        const oldTodos = [...this.state.todos];
        const updatedTodos = oldTodos.filter(element => {
          return element.key !== key;
        });
        this.setState({ todos: updatedTodos });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addItem(e) {
    e.preventDefault();
    if (this.inputElement.current.value !== "") {
      const newTodoBatch = {
        title: this.inputElement.current.value,
        text: { text0: 0 }
      };
      console.log(newTodoBatch);
      const updatedData = [...this.state.todos];

      axios
        .post("/todos.json", newTodoBatch)
        .then(res => {
          updatedData.push({ ...newTodoBatch, key: res.data.name });
          this.setState({ todos: updatedData });
          this.inputElement.current.value = "";
          this.inputElement.current.focus();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    const fetchedData = [];
    axios
      .get("/todos.json")
      .then(res => {
        for (let key in res.data) {
          fetchedData.push({
            ...res.data[key],
            key: key
          });
        }
        this.setState({ todos: fetchedData, dataReceived: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let todos = this.state.dataReceived ? (
      <div>
        {this.state.todos.map(todo => {
          return (
            <TodoCard
              key={todo.key}
              data={todo}
              delete={this.deleteItem.bind(this, todo.key)}
            ></TodoCard>
          );
        })}
      </div>
    ) : (
      undefined
    );

    return (
      <div className="App">
        <Typography
          style={{ margin: "10px" }}
          color="primary"
          gutterBottom
          variant="h4"
          component="h2"
        >
          Todo Lists({this.state.todos.length})
        </Typography>

        <form onSubmit={this.addItem.bind(this)}>
          <TextField
            required
            label="Enter a name of a todo list"
            type="text"
            inputRef={this.inputElement}
          />{" "}
          <Button type="submit" variant="outlined" endIcon={<Send></Send>}>
            Add
          </Button>
        </form>

        {todos}
      </div>
    );
  }
}

export default App;
