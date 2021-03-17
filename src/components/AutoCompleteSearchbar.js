import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { starWarsShips } from "./StarWarsShips.js";

export default function SearchBar(props) {
  return (
    <Autocomplete
      id="star-wars-searchbar"
      freeSolo
      onChange={(event, value) => {
        props.handleSearchbarInput(
          value !== null || undefined ? value.trim() : ""
        );
      }}
      options={[...new Set(starWarsShips.map(ship => ship.name))].sort()} //Removes duplicate names, and sorts options alphabetically
      renderInput={params => (
        <TextField
          style={{
            marginTop: "2%",
            marginBottom: "2%",
            position: "relative"
          }}
          {...params}
          placeholder="Search"
          margin="dense"
          variant="outlined"
        />
      )}
    />
  );
}
