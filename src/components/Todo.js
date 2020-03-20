import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import classes from "./Todo.module.css";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";

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
            <TextField
              required
              type="text"
              onChange={e => setValue(e.target.value)}
              placeholder={props.text}
              value={value}
            />
          </form>
        </Grid>
        <Grid item>
          <Button
            onClick={() => props.edit(value)}
            variant="outlined"
            color="primary"
          >
            <SaveIcon></SaveIcon>
          </Button>{" "}
          <Button
            onClick={props.changeEditState}
            variant="contained"
            color="secondary"
            startIcon={<CancelIcon />}
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
          <Button
            onClick={props.changeEditState}
            variant="outlined"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>{" "}
          <Button onClick={props.delete} variant="contained" color="secondary">
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default Todo;
