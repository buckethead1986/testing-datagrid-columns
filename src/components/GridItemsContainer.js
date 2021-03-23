import React, { useReducer } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVert from "@material-ui/icons/MoreVert";
import Link from "@material-ui/core/Link";
import StarWarsDataGrid from "./StarWarsDataGrid.js";
import { starWarsShips } from "./StarWarsShips.js";

//tests search input against regex for common mispellings of X-Wing, Y-Wing, AT-AT, etc.
const searchbarRegex = string => {
  const atat = /at[^st]?at?/i; //matches misspellings of AT-AT.
  // at: Any word containing 'at'
  //[^st]: zero to one symbol that isn't 's' or 't' ('attack' failed, and 'at-st' is a separate regex)
  //a: a
  //t?: zero to one 't'
  //'i' is case insensitive
  const atst = /at[^a]?st/i; //Same for AT-ST
  const anyWing = /([xyabu]).?w/i; // x|y|a|b|u-wing. Captures x,y,a,b, or u in string.match(anyWing)
  if (atat.test(string)) {
    return "at-at at-act "; //not at-at, so 'AT-ACT' matches. Trust me, it's an AT-AT. Working on how to match Heavy Assault Walker as well
  } else if (atst.test(string)) {
    return "at-st";
  } else if (anyWing.test(string)) {
    return string.match(anyWing)[1] + "-wing";
  } else {
    return string;
  }
};

export default function GridItemsContainer(props) {
  const [helpText, toggleHelpText] = useReducer(state => !state, true);
  // Normally with useReducer you pass a value to dispatch to indicate what action to
  // take on the state, but in this case there's only one action.
  // e.g. const [open, toggleHelpText] = useReducer(toggleReducer, true).
  //'toggleReducer' would only ever return !state, because there aren't multiple actions to select from

  //Filters ships based on searchbarValue. Returns an array of exact matches, or an array of partial matches if there are no exact matches.
  const searchbarMatches = () => {
    const exactMatch = [];
    const partialMatch = [];
    starWarsShips.forEach(item => {
      if (item.name === props.searchbarValue) {
        exactMatch.push(item);
      }
      if (
        item.name
          .toLowerCase()
          .includes(searchbarRegex(props.searchbarValue).toLowerCase()) ||
        item.model.toLowerCase().includes(props.searchbarValue.toLowerCase())
      ) {
        partialMatch.push(item);
      }
    });
    if (exactMatch.length > 0) {
      return exactMatch;
    } else {
      return partialMatch;
    }
  };

  //Filters ships based on toggled filter parameters from DrawerList.js
  const filteredShips = starWarsShips.filter(item => {
    if (props.filterArray.length === 0) {
      return item;
    } else {
      return (
        (props.filterArray[0].length !== 0
          ? props.filterArray[0].some(f => f(item))
          : item) &&
        (props.filterArray[1].length !== 0
          ? props.filterArray[1].some(f => f(item))
          : item) &&
        (props.filterArray[2].length !== 0
          ? props.filterArray[2].some(f => f(item))
          : item)
      );
    }
  });

  const bulletedHelpList = (
    <ul>
      <li>
        <Typography>
          Filter the results below by using the Search box to the left, or by
          selecting any combination of Production Year, Ship Type, and Faction
          from the dropdown options.
        </Typography>
      </li>
      <li>
        <Typography>
          Click any column header to toggle sorting method: Ascending,
          Descending, or None.
        </Typography>
      </li>
      <li>
        <Typography>
          Select a column menu (
          <IconButton disabled style={{ padding: (0, 0, 3, 0) }}>
            <MoreVert color="primary" fontSize="small" />
          </IconButton>) for more specific sorting, filtering, and to show/hide
          columns.
        </Typography>
      </li>
      <li>
        <Typography>Click on any image to see a larger view.</Typography>
      </li>
    </ul>
  );

  return (
    <Container maxWidth="xl">
      <Typography style={{ marginBottom: "10px" }}>
        Welcome to the Hot Wheels Star Wars Starships Wiki! This is a repository
        for product information, images, and extra content about the collectible
        series.
        <Link underline="none" href="#" onClick={toggleHelpText}>
          {helpText ? " (Close Help)" : " (Open Help)"}
        </Link>
      </Typography>

      {helpText && (
        <div style={{ marginBottom: "10px" }}>{bulletedHelpList}</div>
      )}

      <StarWarsDataGrid
        filteredShips={
          props.searchbarValue.length !== 0 ? searchbarMatches() : filteredShips
        }
      />
    </Container>
  );
}
