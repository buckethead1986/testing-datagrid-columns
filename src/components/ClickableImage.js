import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles({
  root: {
    margin: 0,
    padding: 0
  },
  img: {
    margin: "auto",
    maxWidth: "100%"
  },
  smallImage: {
    maxHeight: 90
  },
  largeImage: {
    maxHeight: "85vh"
  }
});

export default function ClickableImage(props) {
  const classes = useStyles();
  const [open, toggleOpen] = useReducer(state => !state, false);
  // Normally with useReducer you pass a value to dispatch to indicate what action to
  // take on the state, but in this case there's only one action.
  // e.g. const [open, toggleOpen] = useReducer(toggleReducer, true).
  //'toggleReducer' would only ever return !state, because there aren't multiple actions to select from

  return props.src.length !== 0 ? (
    <div>
      <Button className={classes.root} onClick={toggleOpen}>
        <img
          onError={event => (event.target.style.display = "none")}
          className={clsx(classes.img, classes.smallImage)}
          src={props.src}
          alt={props.alt}
        />
      </Button>
      <Dialog onClose={toggleOpen} open={open}>
        <img
          className={clsx(classes.img, classes.largeImage)}
          src={props.src}
          alt={props.alt}
        />
      </Dialog>
    </div>
  ) : (
    ""
  );
}
