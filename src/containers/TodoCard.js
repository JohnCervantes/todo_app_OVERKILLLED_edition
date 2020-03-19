import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Todo from "../components/Todo";

class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = {
      todos: []
    };
  }

  render() {
    console.log(this.props.data.text);

    const todos = (
      <div>
        {this.props.data.text.map((todo, index) => {
          return (
            <Todo
              key={todo.index}
              text={todo}
              // delete={this.deleteItem.bind(this, index)}
            ></Todo>
          );
        })}
      </div>
    );

    return (
      <Card style={{ width: "20%", display: "inline-block", margin: "30px" }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {this.props.data.title}
          </Typography>
          <Typography variant="h5" component="h2">
            <ul>{todos}</ul>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }
}

export default TodoCard;

// addItem(e) {
//     e.preventDefault();
//     if (this.inputElement.current.value !== "") {
//       const fetchedData = [...this.state.todos];
//       axios
//         .post("/todo1.json", { text: this.inputElement.current.value })
//         .then(res => {
//           for (let key in res.data) {
//             fetchedData.push({
//               text: this.inputElement.current.value,
//               key: key
//             });
//           }
//           this.setState({ todos: fetchedData });

//           this.inputElement.current.value = "";
//           this.inputElement.current.focus();
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   }

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
