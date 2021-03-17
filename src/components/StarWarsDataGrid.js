import * as react from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ClickableImage from "./ClickableImage.js";

const useStyles = makeStyles(theme => ({
  root: {
    //Workaround to let text wrap in DataGrid cells
    "& div.MuiDataGrid-cell": {
      whiteSpace: "normal"
    },
    //padding for image cells is less than for text cells
    "& .less-padding-for-image-cells": {
      padding: "0 8px",
      justifyContent: "center"
    }
  }
}));

export default function StarWarsDataGrid(props) {
  const classes = useStyles();

  const textColumns = [
    ["year", "Year", 0.3],
    ["model", "Model", 0.3],
    ["faction", "Faction", 0.3],
    ["class", "Class", 0.3],
    ["type", "Type", 0.3],
    ["extra", "Extra", 0.6]
  ].map(column => {
    return {
      field: column[0],
      headerName: column[1],
      flex: column[2],
      renderCell: params => (
        <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
      )
    };
  });

  const imageColumns = [
    ["src", "Image"],
    ["packsrc", "Pack"],
    ["backsrc", "Reverse"]
  ].map(column => {
    return {
      field: column[0],
      headerName: column[1],
      width: 100,
      cellClassName: "less-padding-for-image-cells",
      disableColumnMenu: true,
      sortable: false,
      renderCell: params => (
        <ClickableImage src={params.value} alt={params.getValue("name")} />
      )
    };
  });

  //returns array of columns for DataGrid, using textColumns and imageColumns generated above.
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.7,
      renderCell: params => <Typography>{params.value}</Typography> //<Typography> has own styling and renders larger
    }
  ].concat(textColumns, imageColumns);

  //This is the longhand version of the column definitions. Similar columns were combined into const's textColumns and imageColumns (above), and generated using .map
  // const longhandColumns = [
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 0.8,
  //     renderCell: params => <Typography>{params.value}</Typography> //<Typography> has own styling and renders larger
  //   },
  //   {
  //     field: "year",
  //     headerName: "Year",
  //     flex: 0.3
  //   },
  //   { field: "model", headerName: "Model", flex: 0.3 },
  //   {
  //     field: "faction",
  //     headerName: "Faction",
  //     flex: 0.4,
  //     renderCell: params => (
  //       <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
  //     )
  //   },
  //   {
  //     field: "class",
  //     headerName: "Class",
  //     flex: 0.4,
  //     renderCell: params => (
  //       <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
  //     )
  //   },
  //   {
  //     field: "type",
  //     headerName: "Type",
  //     flex: 0.4,
  //     renderCell: params => (
  //       <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
  //     )
  //   },
  //   {
  //     field: "extra",
  //     headerName: "Extra",
  //     flex: 0.5,
  //     renderCell: params => (
  //       <Typography style={{ fontSize: "0.9rem" }}>{params.value}</Typography>
  //     )
  //   },
  //   {
  //     field: "src",
  //     headerName: "Image",
  //     width: 100,
  //     disableColumnMenu: true,
  //     cellClassName: "less-padding-for-image-cells",
  //     sortable: false,
  //     renderCell: params => (
  //       <ClickableImage src={params.value} alt={params.getValue("name")} />
  //     )
  //   },
  //   {
  //     field: "packsrc",
  //     headerName: "Pack",
  //     width: 100,
  //     disableColumnMenu: true,
  //     cellClassName: "less-padding-for-image-cells",
  //     sortable: false,
  //     renderCell: params => (
  //       <ClickableImage src={params.value} alt={params.getValue("name")} />
  //     )
  //   },
  //   {
  //     field: "backsrc",
  //     headerName: "Reverse",
  //     width: 100,
  //     disableColumnMenu: true,
  //     cellClassName: "less-padding-for-image-cells",
  //     sortable: false,
  //     renderCell: params => (
  //       <ClickableImage src={params.value} alt={params.getValue("name")} />
  //     )
  //   }
  // ];

  //default height for DataGrid is 0. This is a workaround I found to enable content to load below the grid
  const gridWrapperRef = react.useRef(null);
  react.useLayoutEffect(() => {
    const gridDiv = gridWrapperRef.current;
    if (gridDiv) {
      // const gridEl: HTMLDivElement = gridDiv.querySelector("div");
      gridDiv.style.height = "";
    }
  });

  return (
    <div ref={gridWrapperRef} className={classes.root}>
      <DataGrid
        pageSize={25}
        rowsPerPageOptions={[25, 50, 75, 100]}
        rows={props.filteredShips}
        columns={columns}
        autoHeight
        rowHeight={100}
        showCellRightBorder={true}
        showColumnRightBorder={true}
      />
    </div>
  );
}
