import React, { useReducer } from "react";
import Drawer from "./Drawer.js";

//contains boolean toggles for all filter options, separated by type.
//filterArray is modified when a filter selection is toggled on, to contain the corresponding function from filterFunctions below.
//searchbarValue is the searchbar value, and is reset to "" when a filter is toggled on or off (So whatever was last used, a filter toggle or searchbar input, is used to sort the data)
const initialState = {
  year: {
    "2015": false,
    "2016": false,
    "2017": false,
    "2018": false,
    "2019": false
    // "2020": { selected: false, function: ship => ship.year === 2020 } //no corresponding data in starWarsShips.js yet
  },
  type: {
    "Capital Ship": false,
    Walker: false,
    Speeder: false,
    Fighter: false,
    Shuttle: false,
    "X-Wing": false,
    "TIE Fighter": false,
    Concept: false,
    Commemorative: false
  },
  faction: {
    Rebel: false,
    Imperial: false,
    Republic: false,
    Resistance: false,
    "First Order": false,
    Unaffiliated: false
  },
  searchbarValue: "",
  filterArray: []
};

const filterFunctions = {
  year: {
    "2015": ship => ship.year === 2015,
    "2016": ship => ship.year === 2016,
    "2017": ship => ship.year === 2017,
    "2018": ship => ship.year === 2018,
    "2019": ship => ship.year === 2019
    // "2020": { selected: false, function: ship => ship.year === 2020 } //no corresponding data in starWarsShips.js yet
  },
  type: {
    "Capital Ship": ship => ship.type.indexOf("Capital Ship") !== -1,
    Walker: ship => ship.type.indexOf("Walker") !== -1,
    Speeder: ship => ship.type.indexOf("Speeder") !== -1,
    Fighter: ship => ship.type.indexOf("Fighter") !== -1,
    Shuttle: ship => ship.type.indexOf("Shuttle") !== -1,
    "X-Wing": ship => ship.class.indexOf("X-Wing") !== -1,
    "TIE Fighter": ship => ship.class.indexOf("TIE") !== -1,
    Concept: ship => ship.extra.indexOf("Concept") !== -1,
    Commemorative: ship => ship.extra.indexOf("Commemorative") !== -1
  },
  faction: {
    Rebel: ship => ship.faction.indexOf("Rebel") !== -1,
    Imperial: ship => ship.faction.indexOf("Imperial") !== -1,
    Republic: ship => ship.faction.indexOf("Republic") !== -1,
    Resistance: ship => ship.faction.indexOf("Resistance") !== -1,
    "First Order": ship => ship.faction.indexOf("First Order") !== -1,
    Unaffiliated: ship => ship.faction.indexOf("Unaffiliated") !== -1
  }
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SELECTION":
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.name]: !state[action.category][action.name]
        }
      };
    case "HANDLE_SEARCHBAR_INPUT":
      return {
        ...state,
        searchbarValue:
          action.searchbarValue !== undefined ? action.searchbarValue : ""
      };
    case "CREATE_FILTERS":
      return {
        ...state,
        searchbarValue: "",
        filterArray: ["year", "type", "faction"].map(value => {
          let arr = [];
          for (const filter in state[value]) {
            if (state[value][filter]) {
              arr.push(filterFunctions[value][filter]);
            }
          }
          return arr;
        })
      };
    default:
      return state;
  }
};

export default function Container() {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  //toggles a filter selection on or off, and updates filterArray
  const handleFilterSelection = (category, name) => {
    dispatch({
      type: "TOGGLE_SELECTION",
      category: category,
      name: name
    });
    dispatch({
      type: "CREATE_FILTERS"
    });
  };

  const handleSearchbarInput = searchbarValue => {
    dispatch({
      type: "HANDLE_SEARCHBAR_INPUT",
      searchbarValue: searchbarValue
    });
  };

  return (
    <div>
      <Drawer
        handleFilterSelection={handleFilterSelection}
        handleSearchbarInput={handleSearchbarInput}
        filterArray={state.filterArray}
        searchbarValue={state.searchbarValue}
      />
    </div>
  );
}
