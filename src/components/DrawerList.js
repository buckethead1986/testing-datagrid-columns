import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowRight from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  }
}));

const initialState = {
  open: false,
  checked: []
};

const listItemsReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return {
        ...state,
        open: !state.open
      };
    case "TOGGLE_CHECKED":
      return {
        ...state,
        checked: action.checked
      };
    default:
      return { state };
  }
};

export default function DrawerList(props) {
  const classes = useStyles();

  // ---------- useReducer version for tracking checked selections ----------
  // Requires 'state.open' and 'state.checked' in makeListItems and return()
  const [state, dispatch] = useReducer(listItemsReducer, initialState);

  const handleOpen = () => {
    dispatch({ type: "TOGGLE_OPEN" });
  };

  const handleChecked = (item, value) => () => {
    const currentIndex = state.checked.indexOf(value);
    const newChecked = [...state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    dispatch({ type: "TOGGLE_CHECKED", checked: newChecked });
    props.handleFilterSelection(props.name, item);
  };
  //----------

  // ---------- useState version for tracking checked selections ----------
  // Requires 'open' and 'checked' in makeListItems and return()

  // const [open, setOpen] = React.useState(false);
  // const [checked, setChecked] = React.useState([]);
  //
  // const handleOpen = () => {
  //   setOpen(!open);
  // };
  //
  // const handleChecked = (item, value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];
  //
  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  //   props.handleFilterSelection(props.name, item);
  // };

  //----------

  const makeListItems = (
    <List>
      {props.list.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem
            button
            onClick={handleChecked(item, index)}
            key={item}
            className={classes.nested}
          >
            <ListItemIcon>
              <ArrowRight fontSize="large" />
            </ListItemIcon>
            <ListItemText primary={item} />
            <Checkbox
              edge="end"
              checked={state.checked.indexOf(index) !== -1}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <List component="div" disablePadding>
      <ListItem button onClick={handleOpen}>
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.primary} />
        {state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={state.open} timeout="auto" unmountOnExit>
        {makeListItems}
      </Collapse>
    </List>
  );
}
