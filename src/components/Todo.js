import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import classes from "./Todo.module.css";

const Todo = props => {
  const [value, setValue] = React.useState("");
  if (props.editing) {
    return (
      <Grid
        container
        gutterBottom
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.ListStyle}
      >
        <Grid item>
          <form>
            <input
              placeholder={props.text}
              onChange={e => setValue(e.target.value)}
              type="text"
              value={value}
              size="10"
            />
          </form>
        </Grid>
        <Grid item>
          <Button onClick={() => props.edit(value)} variant="outlined">
            Save
          </Button>{" "}
          <Button
            onClick={props.changeEditState}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid
        container
        gutterBottom
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.ListStyle}
      >
        <Grid item>
          <li>{props.text}</li>
        </Grid>
        <Grid item>
          <Button onClick={props.changeEditState} variant="outlined">
            Edit
          </Button>{" "}
          <Button
            onClick={props.delete}
            variant="contained"
            color="secondary"
          >
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default Todo;
