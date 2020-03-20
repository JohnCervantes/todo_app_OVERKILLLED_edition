import React, { Component } from "react";
import TodoCard from "./TodoCard";
import axios from "../axios-todos";

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
        text: [""]
      };
      const currentData = [...this.state.todos];

      axios
        .post("/todos.json", newTodoBatch)
        .then(res => {
          currentData.push({ ...newTodoBatch, key: res.data.name });
          this.setState({ todos: currentData });
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
          fetchedData.push({ ...res.data[key], key: key });
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
        {this.state.todos.map((todo, index) => {
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
        <h1>Todo()</h1>
        <form onSubmit={this.addItem.bind(this)}>
          <input
            placeholder="Enter the title of your todo list here"
            type="text"
            ref={this.inputElement}
          />
          <button type="submit">Add</button>
        </form>

        {todos}
        {/* <TodoItems entries={this.state.items} /> */}
      </div>
    );
  }
}

export default App;
