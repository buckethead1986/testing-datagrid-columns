import React from "react";
import Drawer from "./Drawer.js";

export default function Container() {
  const [searchbarValue, setSearchbarValue] = React.useState("");
  const [shipFilter, setShipFilter] = React.useState({
    //state containing toggles for selected filters from drawer.js, and functions to filter StarWarsShips.js with when 'selected' is true
    filterParameters: {
      year: {
        "2015": { selected: false, function: ship => ship.year === 2015 },
        "2016": { selected: false, function: ship => ship.year === 2016 },
        "2017": { selected: false, function: ship => ship.year === 2017 },
        "2018": { selected: false, function: ship => ship.year === 2018 },
        "2019": { selected: false, function: ship => ship.year === 2019 }
        // "2020": { selected: false, function: ship => ship.year === 2020 }
      },
      type: {
        "Capital Ship": {
          selected: false,
          function: ship => ship.type.indexOf("Capital Ship") !== -1
        },
        Walker: {
          selected: false,
          function: ship => ship.type.indexOf("Walker") !== -1
        },
        Speeder: {
          selected: false,
          function: ship => ship.type.indexOf("Speeder") !== -1
        },
        Fighter: {
          selected: false,
          function: ship => ship.type.indexOf("Fighter") !== -1
        },
        Shuttle: {
          selected: false,
          function: ship => ship.type.indexOf("Shuttle") !== -1
        },
        "X-Wing": {
          selected: false,
          function: ship => ship.class.indexOf("X-Wing") !== -1
        },
        "TIE Fighter": {
          selected: false,
          function: ship => ship.class.indexOf("TIE") !== -1
        },
        Concept: {
          selected: false,
          function: ship => ship.special.indexOf("Concept") !== -1
        },
        Commemorative: {
          selected: false,
          function: ship => ship.special.indexOf("Commemorative") !== -1
        }
      },
      faction: {
        Rebel: {
          selected: false,
          function: ship => ship.faction.indexOf("Rebel") !== -1
        },
        Imperial: {
          selected: false,
          function: ship => ship.faction.indexOf("Imperial") !== -1
        },
        Republic: {
          selected: false,
          function: ship => ship.faction.indexOf("Republic") !== -1
        },
        Resistance: {
          selected: false,
          function: ship => ship.faction.indexOf("Resistance") !== -1
        },
        "First Order": {
          selected: false,
          function: ship => ship.faction.indexOf("First Order") !== -1
        },
        Unaffiliated: {
          selected: false,
          function: ship => ship.faction.indexOf("Unaffiliated") !== -1
        }
      }
    },
    filterArray: []
  });

  const handleSearchbarInput = searchbarData => {
    setSearchbarValue(searchbarData !== undefined ? searchbarData : "");
  };

  //Toggles selected DrawerList.js filters and updates shipFilter.filterArray
  const handleShipFilter = (shipFilterSelection, shipFilterType) => {
    let filterParametersCopy = { ...shipFilter.filterParameters };

    //toggles selections
    if (shipFilterSelection !== undefined) {
      filterParametersCopy[shipFilterType][shipFilterSelection].selected
        ? (filterParametersCopy[shipFilterType][
            shipFilterSelection
          ].selected = false)
        : (filterParametersCopy[shipFilterType][
            shipFilterSelection
          ].selected = true);
    }

    //creates array of filterFunctions
    let filterFunctionsArray = ["year", "type", "faction"].map(value => {
      let obj = Object.values(filterParametersCopy[value]);
      let arr = [];
      obj.forEach(x => {
        if (x.selected) {
          arr.push(x.function);
        }
      });
      return arr;
    });

    setShipFilter({
      ...shipFilter,
      filterParameters: filterParametersCopy,
      filterArray: filterFunctionsArray
    });
    setSearchbarValue("");
  };

  return (
    <Drawer
      handleShipFilter={handleShipFilter}
      handleSearchbarInput={handleSearchbarInput}
      shipFilter={shipFilter}
      searchbarValue={searchbarValue}
    />
  );
}
