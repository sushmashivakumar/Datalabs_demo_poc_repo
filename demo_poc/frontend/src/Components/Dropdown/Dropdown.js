import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {  CategoryList, CategoryItem } from "../../Mockdata";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
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
  const [formData, setFormData] = useState([]);
  const [allData,setAllData] = useState([]);
  
  useEffect(() => {
    axios('http://localhost:3000/state')
    .then(response => {
    console.log("Backend test",response.data)
    setAllData(response.data);
    })
    .catch(error => {
    console.log('Error getting fake data: ' + error);
    })
    }, []);
  const [categoryitem, setCategoryItem] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    if (name === "category") {
      const filter = CategoryItem.filter(
        (category) =>
          category.category.toString() === event.target.value.toString()
      );
      setCategoryItem(filter);
    
    }
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    // console.log('submit', formData)
    if (
      formData.state !== "" &&
      formData.category !== "" &&
      formData.item !== ""
    ) {
      handleFilterData(allData);
    }
    // console.log(formData, 'data from')
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          htmlFor="outlined-age-native-simple"
          className={classes.InputLabel} >
          Select State
        </InputLabel>
        {/* <Select
          native
          value={allData.state}
          onChange={handleChange}
          label="state"
          inputProps={{
            state_name: allData[1],
            state_id: allData[0],
          }}
        >
          <option aria-label="None" value="" />
          {allData.state.map((allData) => (
            <option value={allData.state_name}>{allData.state_name}</option>
          ))}
        </Select> */}
        {/* <Select
          native
          // value={allData.map((value,index)=>{
          //   return(
          //     <div></div>
          //   )
          // })}
          onChange={handleChange}
          inputProps={{
            
          }}>
          <option aria-label="None" value="" />
          {State.map((state) => (
            <option value={state.id}>{state.state}</option>
          ))}
        </Select> */}
        {/* <div className="options">
       {
       allData.map(allData => <div className="option">{allData.state}</div>)
       }
        </div> */}
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          Select Item Category
        </InputLabel>
        <Select
          native
          value={formData.category}
          onChange={handleChange}
          label="CategoryList"
          inputProps={{
            name: "category",
            id: "outlined-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          {CategoryList.map((clist) => (
            <option value={clist.id}>{clist.categoryName}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          Select Item List
        </InputLabel>
        <Select
          native
          value={formData.item}
          onChange={handleChange}
          label="Item"
          inputProps={{
            name: "item",
            id: "outlined-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          {categoryitem.map((item) => (
            <option value={item.id}>{item.itemName}</option>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </div>
  );
}
