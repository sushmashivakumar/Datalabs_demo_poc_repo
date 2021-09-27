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
  console.log("Dropdown", props)
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
    axios.get("http://localhost:3000/api/state")
      .then((response) => {
        // console.log("State List", response.data);
        let finalData = response.data.states.map((item) => item);
        setStateData(finalData);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });

      axios.get("http://localhost:3000/api/item_category")
      .then((response) => {
        console.log("Backend test category", response.data);
        let itemData = response.data.category_list.map((item) => item);
        setCategoryData(itemData);
        console.log('itemData', itemData)
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });

      axios.get("http://localhost:3000/api/item_list")
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
console.log('event', event)
    if (dropdown === "states" && event !== null) {
      // console.log(selectedState, "this is selected state")
      setSelectedState(event.state_id);
    }

   
    if (dropdown === "item_category" && event !== null ) {
      setSelectedCategory(event.category_id);
      console.log(event.category_id, "this is event");
      
      const finalData = itemListData.filter((item_category )=> item_category.category_id === event.category_id)

      setFilteredItemsData(finalData);
      // (event.target.value)
    }

    if (dropdown === "item_list" && event !== null) {
      // console.log(event.item_name, "this is item list name");
      //localStorage.setItem("ITEMNAME",event.item_name)
      props.getUpdated(event, "1")
      setSelectedItemList(event.item_id,event.item_name);
    }
  };

  const handleSubmit = () => {
    console.log('test')
    console.log(selectedState +',' +selectedCategory+',' +selectedItemList)
    if (
      selectedState !== "" &&
      selectedCategory !== "" &&
      selectedItemList !== ""
    ) {
      axios.post("http://localhost:3000/api/city_filter",{ state_id: selectedState,
      category_id: selectedCategory,
      item_id: selectedItemList,})
      // localStorage.removeItem("CITY")
      .then((response) => {
        console.log('response', response)
        //console.log("Backend city itemList", response.data[0].city_list);
        if(response.data.length && response.data[0].city_list !== undefined) {
          props.getUpdated(response.data[0].city_list, "2")
        }else {
          props.getUpdated([], "2")
        }
        
        // let listData = response.data.item_list.map((item) => item);
        // setItemListData(listData);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
      // handleFilterData({
      //   state_id: selectedState,
      //   category_id: selectedCategory,
      //   item_id: selectedItemList,
      // });
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
        // onChange={handleChange}
        onChange={(event, value) => handleChange(value, "states")}
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
        onChange={(event, value) => handleChange(value, "item_category")}
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
        options={filteredItemsData}
        // onChange={(event,value) => handleChange(event, value)}
        // onChange={handleChange}
        onChange={(event, value) => handleChange(value, "item_list")}
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
      <Button
       variant="contained" 
       onClick={() => handleSubmit()}
       style={{
         marginLeft : "35%",
          backgroundColor:"#3f51b5",
          // width:60,
          // fontSize:14,
          // fontWeight:"bold"
          }} color="primary">
        Filter
      </Button>
    </Box>
  );
}

