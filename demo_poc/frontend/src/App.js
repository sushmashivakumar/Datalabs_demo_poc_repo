import React, { useState } from "react";
import "./App.css";
import { alpha, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// import Card from './Components/Card/Card';
import Dropdown from "./Components/Dropdown/Dropdown";
import Tabs from "./Components/Tabs/Tabs";
// import layoutUI from './Components/Layout/layout';
import Drawer from "@material-ui/core/Drawer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
// import layoutPart from './Components/Layout/layout';

// import App from '../../src/Components/Dropdown/Dropdown';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { State, City, CategoryList, CategoryItem, Brand } from "./Mockdata";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    color: "#000133",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  appBar: {
    background: "#00022E",
    color: "#fff",
  },
  icon: {
    padding: "10px",
  },
  title: {
    margin: "auto",
  },
  container: {
    display: "flex",
    flex: 1,
  },
  drawer: {
    background: "#D8DCD6",
    position: "static",
    transition: "width .7s",
  },
  closed: {
    width: "0px",
  },
  opened: {
    width: "240px",
  },
  main: {
    flex: 1,
    background: "#f7f5f5",
    color: "black",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  footer: {
    background: "#00022E",
    height: "50px",
    color: "#fff",
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  const handleSubmit = (country, category, storeName) => {
    console.log(country, category, storeName, "all data");
  };
  const [isOpened, setIsOpened] = useState(false);
  const [filterData, setFilterData] = useState({});
  const handleFilterData = (data) => {
    setFilterData(data);
  };
  const [alldata, setAllData] = useState({});
  const getAllData = (data) => {
    setAllData(data);
  };

  const handleExport = () => {
    if (Object.keys(alldata).length) {
      const dataSet1 = [
        {
          State: State.find(
            (state) => state.id.toString() === alldata.state.toString()
          )?.state,
          Category: CategoryList.find(
            (category) => category.id.toString() === alldata.state.toString()
          )?.categoryName,
          Item: CategoryItem.find(
            (item) => item.id.toString() === alldata.state.toString()
          )?.itemName,
          City: City.find(
            (city) => city.id.toString() === alldata.state.toString()
          )?.city,
          Brand: Brand.find(
            (brand) => brand.id.toString() === alldata.state.toString()
          )?.brand,
          Price: alldata.price,
          Discount: alldata.discount,
          EffectivePrice: alldata.effectiveprice,
          Verified: alldata.status,
        },
      ];
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(dataSet1);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "Export" + fileExtension);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setIsOpened(!isOpened)}
            className={classes.icon}
          >
            {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Datalabs Item POC
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div className={classes.container}>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawer, {
              [classes.closed]: !isOpened,
              [classes.opened]: isOpened,
            }),
          }}
        >
          Drawer
        </Drawer>
        <main className={classes.main}>
          {/* Item List */}
          <Grid container spacing={6}>
            <Grid item xs={3} sm={3}>
              <Paper className={classes.paper}>
                <Dropdown handleFilterData={handleFilterData} />
              </Paper>
            </Grid>
            <Grid item xs={9} sm={9}>
              <Paper className={classes.paper}>
                <Tabs filterData={filterData} getAllDataEvent={getAllData} />
                <Grid item xs={3} sm={3}>
                  <button onClick={() => handleExport()}>Export</button>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
        </main>
      </div>
      <div className={classes.footer}>
        <Typography variant="h6">Footer</Typography>
      </div>
    </div>
  );
}

// export default App;
