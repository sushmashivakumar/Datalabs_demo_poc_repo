import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
// import { CategoryList, CategoryItem } from "../../Mockdata";
import axios from "axios";

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
  //const { handleFilterData } = props;
  const classes = useStyles();
  //const [formData, setFormData] = useState([]);
  const [allData, setAllData] = useState({
    state:[], empState:""
    // category:[],
    // itemList:[]
  });

  useEffect(() => {
    axios("http://localhost:3000/state")
      .then((response) => {
        console.log("Backend test", response.data);
        let finalData = response.data.states.map(item=>item)
        
        setAllData({state:finalData});
        console.log(finalData, "this is final")
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);

  const [categoryitem, setCategoryItem] = useState({
    category:[],empCategory:""
 });

  useEffect(() => {
    axios('http://localhost:3000/item_category')
    .then(response => {
    console.log("Backend test category",response.data);
    let categoryData = response.data.item_category.map(item=>item)
    setCategoryItem({category: categoryData});
    })
    .catch(error => {
    console.log('Error getting fake data: ' + error);
    })
    }, []);
  
    const [item, setItem] = useState({
     itemList:[],empitemList:""
    }
    );
    useEffect(() => {
      axios('http://localhost:3000/item_list')
      .then(response => {
      console.log("Backend test itemList",response.data)
      let itemData = response.data.item_list.map(item=>item)
      setItem({itemList: itemData});
      })
      .catch(error => {
      console.log('Error getting fake data: ' + error);
      })
      }, []);
  
  const handleChange = (event, dropdown) => {
   
    if(dropdown === "state"){

      setAllData(...allData, {empState:event.target.value})
      console.log(allData, "sssss")
  
    }
    
    if(dropdown === "empCategory"){
     
      setCategoryItem(...categoryitem, {empCategory:event.target.value})
      console.log(categoryitem, "cccccc")
  
    }
    
    if(dropdown === "empItem"){

      setItem(...item, {empitemList:event.target.value})
      console.log(item, "cccccc")
  
    }
    // const name = event.target.name;
    // if (name === "category") {
    //   const filter = CategoryItem.filter(
    //     (category) =>
    //       category.category.toString() === event.target.value.toString()
    //   );
    //   setCategoryItem(filter);
    // }
    // setFormData({
    //   ...formData,
    //   [name]: event.target.value,
    // });
  };

  const handleSubmit = () => {
    // console.log('submit', formData)
    // if (
    //   formData.state !== "" &&
    //   formData.category !== "" &&
    //   formData.item !== ""
    // ) {
    //   handleFilterData(allData);
    // }
    // console.log(formData, 'data from')
  };

  return (
    
    <div>
      {console.log(allData, "this is aaaaa")}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          htmlFor="outlined-age-native-simple"
          className={classes.InputLabel}
        >
          Select State
        </InputLabel>
        <Select
          native
          value={allData.empState}
          onChange={(event)=>handleChange(event,"state")}
          label="state"
          inputProps={{
            state_name: allData[1],
            state_id: allData[0],
          }}
        >
          <option aria-label="None" value="" />
          {allData.state.map((stateData) => {
           return (<option value={stateData.state_id}>{stateData.state_name}</option>) 
          })}
          
        </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          Select Item Category
        </InputLabel>
        <Select
          native
          value={categoryitem.empCategory}
          onChange={(event)=>handleChange(event,"empCategory")}
          label="category"
          inputProps={{
            category_name:categoryitem[1],
            category_id:categoryitem[0]
          }}
        >
           <option aria-label="None" value="" />
         {categoryitem.category.map((cdata) => {
           return (<option value={cdata.category_id}>{cdata.category_name}</option>)
          })}
        </Select>
     
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          Select Item List
        </InputLabel>
        <Select
          native
          value={item.empItem}
          onChange={handleChange}
          label="Item"
          inputProps={{
            item_name : item[1],
            item_id: item[0]
          }}
        >
          <option aria-label="None" value="" />
          {categoryitem.category.map((cdata) => {
           return (<option value={cdata.category_id}>{cdata.category_name}</option>)
          })}
          {item.itemList.map((citem) => {
           return (<option value={citem.item_id}>{citem.item_name}</option>)
          })}
        </Select>
      </FormControl> 
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
      </div>
    </div>
  );
}
