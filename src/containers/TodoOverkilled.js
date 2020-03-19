import React, { Component } from "react";
import Todo from "../components/Todo";




class App extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = {
      items: []
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
      var newItem = {
        text: this.inputElement.current.value,
        key: Date.now()
      };

      this.setState(prevState => {
        return {
          items: prevState.items.concat(newItem)
        };
      });

      this.inputElement.current.value = "";
      this.inputElement.current.focus();
    }

    console.log(this.state.items);
  }

  render() {
    const todo = (
      <div>
        {this.state.items.map((todo, index) => {
          return (
            <Todo
              key={index}
              text={todo.text}
              delete={this.deleteItem.bind(this, index)}
            ></Todo>
          );
        })}
      </div>
    );

    return (
      <div className="App">
        <h1>Todo({this.state.items.length})</h1>
        <form onSubmit={this.addItem.bind(this)}>
          <input placeholder="Enter todo here" type="text" ref={this.inputElement} />
          <button type="submit">Add</button>
        </form>

        {todo}
        {/* <TodoItems entries={this.state.items} /> */}
      </div>
    );
  }
}

export default App;
