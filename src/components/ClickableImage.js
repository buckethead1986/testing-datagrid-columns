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
  //No separate reducer function needed, as there's only one action to take on the state, toggling state to !state
  //useState would be fine, but I decided to use useReducer throughout this App

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
