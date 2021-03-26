import React, { useReducer } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton
} from "@material-ui/core";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Flight from "@material-ui/icons/Flight";
import Category from "@material-ui/icons/Category";
import Menu from "@material-ui/icons/Menu";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import DrawerList from "./DrawerList.js";
import AutoCompleteSearchbar from "./AutoCompleteSearchbar.js";
import GridItemsContainer from "./GridItemsContainer.js";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: { display: "flex" },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
}));

export default function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, toggleOpen] = useReducer(state => !state, true);
  //No separate reducer function needed, as there's only one action to take on the state, toggling state to !state
  //useState would be fine, but I decided to use useReducer throughout this App

  //creates expandable lists of filter options.
  const createDrawerLists = [
    {
      primary: "Year",
      name: "year",
      icon: CalendarToday,
      list: ["2015", "2016", "2017", "2018", "2019"]
    },
    {
      primary: "Ship Type",
      name: "type",
      icon: Flight,
      list: [
        "Capital Ship",
        "Walker",
        "Speeder",
        "Fighter",
        "Shuttle",
        "X-Wing",
        "TIE Fighter",
        "Concept",
        "Commemorative"
      ]
    },
    {
      primary: "Faction",
      name: "faction",
      icon: Category,
      list: [
        "Rebel",
        "Imperial",
        "Republic",
        "Resistance",
        "First Order",
        "Unaffiliated"
      ]
    }
  ].map(item => {
    return (
      <DrawerList
        key={`drawer-list-${item.name}`}
        handleFilterSelection={props.handleFilterSelection}
        primary={item.primary}
        name={item.name}
        icon={item.icon}
        list={item.list}
      />
    );
  });

  //Makes a resizeable drawer with 3 DrawerList.js dropdown menus to filter from. The drawer is open by default, but closeable.
  //GridItemsContainer (containing the DataGrid) is at the bottom, inside 2 divs that let it resize and render below the AppBar.
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography className={classes.title} align="center" variant="h6">
            Hot Wheels Star Wars Starships Wiki
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleOpen}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <AutoCompleteSearchbar
          handleSearchbarInput={props.handleSearchbarInput}
        />
        <Divider />
        {createDrawerLists}
      </Drawer>

      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div
          style={{
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
          }}
        />
        <GridItemsContainer
          filterArray={props.filterArray}
          searchbarValue={props.searchbarValue}
        />
      </div>
    </div>
  );
}
