import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Todo from "../components/Todo";
import axios from "../axios-todos";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";

class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = {
      todos: { ...this.props.data },
      editing: false
    };
  }

  addTodo(e) {
    e.preventDefault();
    console.log("lolz");
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

  editingState = () => {
    this.setState({ editing: !this.state.editing });
  };

  editTodo = (input, index) => {
    console.log(input);
    console.log(index);
    if (input !== "") {
      const currentData = this.state.todos;
      const currentTodos = currentData.text;
      currentTodos[index] = input;
      const updatedData = { ...currentData, text: currentTodos };

      axios
        .put(`todos/${updatedData.key}.json`, {
          text: updatedData.text,
          title: updatedData.title
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
    this.editingState();
  };

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
              edit={input => this.editTodo(input, todo)}
              changeEditState={this.editingState}
              editing={this.state.editing}
            ></Todo>
          </div>
        );
      }
    });

    return (
      <Card
        style={{
          width: "30%",
          display: "inline-block",
          margin: "30px",
          height: "600px"
        }}
      >
        <CardContent
          style={{
            height: "100px",
            backgroundColor: "#028482"
          }}
        >
          <Typography
            style={{ color: "white", lineHeight: "90px" }}
            color="primary"
            gutterBottom
            variant="h4"
            component="h2"
            align="center"
          >
            {this.props.data.title}
            <hr></hr>
          </Typography>
        </CardContent>
        <CardContent style={{ maxHeight: "500px", overflow: "auto" }}>
          <Typography color="textSecondary" variant="h6" component="h2">
            {this.state.editing ? (
              <ul style={{ margin: "auto", padding: "0" }}>{todos}</ul>
            ) : (
              <form onSubmit={this.addTodo.bind(this)}>
                <TextField
                  required
                  variant="outlined"
                  label="Enter a task"
                  type="text"
                  size="small"
                  inputRef={this.inputElement}
                />{" "}
                <Button
                  type="submit"
                  size="small"
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add a task
                </Button>
                <br></br>
                <br></br>
                <ul style={{ margin: "auto", padding: "0" }}>{todos}</ul>
              </form>
            )}
          </Typography>
          <CardActions>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="row"
            >
              <Grid item>
                {this.state.editing ? (
                  undefined
                ) : (
                  <Button
                    onClick={this.props.delete}
                    size="small"
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete All todos
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

export default TodoCard;
