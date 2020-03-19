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

  deleteItem = index => {
    const items = [...this.state.items];
    items.splice(index, 1);
    this.setState({ items: items });
  };

  addItem(e) {
    e.preventDefault();
    if (this.inputElement.current.value !== "") {
      const fetchedData = [...this.state.todos];
      axios
        .post("/todos.json", { text: this.inputElement.current.value })
        .then(res => {
          for (let key in res.data) {
            fetchedData.push({
              text: this.inputElement.current.value,
              key: key
            });
          }
          this.setState({ todos: fetchedData });

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
              delete={this.deleteItem.bind(this, index)}
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
