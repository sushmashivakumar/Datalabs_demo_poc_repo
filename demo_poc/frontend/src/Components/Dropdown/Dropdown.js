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
  //const { handleFilterData } = props;
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [stateData, setStateData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [itemListData, setItemListData] = useState([]);

  // handle change states
  const [selectedState, setSelectedState] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItemList, setSelectedItemList] = useState('');
  const [filteredItemsData, setFilteredItemsData] = useState([]);

  


  //useEffect for state

  useEffect(() => {
    axios("http://localhost:3000/state")
      .then((response) => {
        console.log("Backend test", response.data);
        let finalData = response.data.states.map(item=>item)
        console.log(finalData, "this is final")
        setStateData(finalData);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);

  //useEffect for item category

  useEffect(() => {
    axios('http://localhost:3000/item_category')
    .then(response => {
    console.log("Backend test category",response.data);
    let itemData = response.data.item_category.map(item=>item)
    setCategoryData(itemData);
    })
    .catch(error => {
    console.log('Error getting fake data: ' + error);
    })
    }, []);
  
   //useEffect for item list
  
    useEffect(() => {
      axios('http://localhost:3000/item_list')
      .then(response => {
      console.log("Backend test itemList",response.data)
      let listData = response.data.item_list.map(item=>item)
      setItemListData(listData);
      })
      .catch(error => {
      console.log('Error getting fake data: ' + error);
      })
      }, []);


      const handleChange = (event, dropdown) => {
       
        // handle change

          if(dropdown === "states"){

            // console.log(selectedState, "this is selected state")
            setSelectedState(event.target.value)
                 
          }

            // const name = event.target.name;
            if(dropdown === 'item_category'){
              setSelectedCategory(event.target.value)
              console.log(event.target.value, 'this is event');
              // var deep = _.cloneDeep(itemListData);
              const filterData = itemListData.filter(item_category => {
                  console.log('filter in');
                if(item_category.category_id === event.target.value){
                  console.log('if inside');
                  return true;
                }
                
              });
              console.log(filterData, "filtered item list");
              setFilteredItemsData(filterData)
              // (event.target.value)
            }
          
            if(dropdown === "item_list"){

              // console.log(selectedState, "this is selected state")
              setSelectedItemList(event.target.value)
                   
            }

            // console.log(selectedState, "this is selected state")
            
                 
          


          // const name = event.target.name;
          // if(name === 'category'){
          //   const filter = item_list.filter(category => category.category.toString() === event.target.value.toString());
          //   setCategoryItem(filter)
          // }
          // setFormData({
          //   ...formData,
          //   [name]: event.target.value,
          // });



         

        }

  const handleSubmit = () => {
   
    if (
      selectedState !== "" &&
      selectedCategory !== "" &&
      selectedItemList !== ""
    ) {
      handleFilterData({state_id:selectedState, category_id:selectedCategory, item_id:selectedItemList});
    }
    console.log( 'data from')
  };
  // console.log(itemListData, 'item list data')
  return (
    
    <div>
     
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          htmlFor="outlined-age-native-simple"
          className={classes.InputLabel}
        >
          Select State
        </InputLabel>
        <Select
          native
          value={selectedState}
          onChange={(event)=>handleChange(event,"states")}
          label="state"
          inputProps={{
            // state_name: stateData.length ? stateData[0].state_name : "",
            // state_id: stateData.length ? stateData[0].state_id : "",
          }}
        >
          <option aria-label="None" value="" />
          {stateData?.map((sdata) => {
           return (<option value={sdata.state_id}>{sdata.state_name}</option>) 
          })}
          
        </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          Select Item Category
        </InputLabel>
        <Select
          native
          value={selectedCategory}
          onChange={(event)=>handleChange(event,"item_category")}
          label="category"
          inputProps={{
            // category_name:categoryData[0].category_name,
            // category_id:categoryData[0].category_id
          }}
        >
           <option aria-label="None" value="" />
         {categoryData.map((cdata) => {
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
          value={selectedItemList}
          onChange={(event)=>handleChange(event,"item_list")}
          label="Item"
          inputProps={{
            // item_name : itemListData[0].item_name,
            // item_id: itemListData[0].item_id
          }}
        >
          <option aria-label="None" value="" />
         
          {filteredItemsData.map((citem) => {
           return (<option value={citem.item_id}>{citem.item_name}</option>)
          })}
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
