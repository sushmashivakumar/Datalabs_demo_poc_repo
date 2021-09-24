import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Box } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  InputLabel: {
    minWidth: 100,
  },
}));

export default function Dropdown(props) {
  const { handleFilterData } = props;
  const classes = useStyles();
  const [stateData, setStateData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [itemListData, setItemListData] = useState([]);

  // handle change states
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItemList, setSelectedItemList] = useState("");
  const [filteredItemsData, setFilteredItemsData] = useState([]);

  //useEffect for state

  useEffect(() => {
    axios("http://localhost:3000/state")
      .then((response) => {
        console.log("State List", response.data);
        let finalData = response.data.states.map((item) => item);
        setStateData(finalData);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);

  //useEffect for item category

  useEffect(() => {
    axios("http://localhost:3000/item_category")
      .then((response) => {
        console.log("Backend test category", response.data);
        let itemData = response.data.item_category.map((item) => item);
        setCategoryData(itemData);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);

  //useEffect for item list

  useEffect(() => {
    axios("http://localhost:3000/item_list")
      .then((response) => {
        console.log("Backend test itemList", response.data);
        let listData = response.data.item_list.map((item) => item);
        setItemListData(listData);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);

  const handleChange = (event, dropdown) => {
    // handle change
console.log("UNILEVER", event)
    if (dropdown === "states") {
      console.log(selectedState, "this is selected state")
      setSelectedState(event.target.value);
    }

    // const name = event.target.name;
    if (dropdown === "item_category") {
      setSelectedCategory(event.target.value);
      console.log(event.target, "this is event");
      // var deep = _.cloneDeep(itemListData);
      const filterData = itemListData.filter((item_category) => {
        console.log(item_category, "filter in");
        if (item_category.category_id === event.target.value) {
          console.log("if inside");
          return true;
        }
      });
      console.log(itemListData, "filtered item list");
      setFilteredItemsData(filterData);
      // (event.target.value)
    }

    if (dropdown === "item_list") {
      setSelectedItemList(event.target.value);
    }
  };

  const handleSubmit = () => {
    if (
      selectedState !== "" &&
      selectedCategory !== "" &&
      selectedItemList !== ""
    ) {
      handleFilterData({
        state_id: selectedState,
        category_id: selectedCategory,
        item_id: selectedItemList,
      });
    }
    console.log("data from");
  };

  return (
    <Box p="10px" m="10px">
      <Autocomplete
        sx={{
          // width: 300
          paddingBottom: 2,
          // marginTop : "-18px"
        }}
        options={stateData}
        onChange={handleChange}
        // onChange={(event) => handleChange(event, "states")}
        autoHighlight
        getOptionLabel={(option) => option.state_name || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select State"
            variant="standard"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />

      <Autocomplete
        sx={{
          // width: 300
          paddingBottom: 2,
        }}
        options={categoryData}
        onChange={(event) => handleChange(event, "item_category")}
        autoHighlight
        getOptionLabel={(option) => option.category_name || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Item Category"
            variant="standard"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />

      <Autocomplete
        sx={{
          // width: 300
          paddingBottom: 2,
        }}
        options={itemListData}
        onChange={(event) => handleChange(event, "item_name")}
        autoHighlight
        getOptionLabel={(option) => option.item_name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Item List"
            variant="standard"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      <Button variant="contained" style={{marginLeft : "35%"}} color="primary">
        Submit
      </Button>
    </Box>
  );
}

