import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

const DropDown = ({handleSubmit}) => {

const filterOptions = createFilterOptions({
	matchFrom: 'start',
	stringify: option => option,
});


//selected values

const [country, setCountry] = useState();
const [category, setCategory] = useState();
const [storeName, setstoreName] = useState();

const handleChange = (e,key) => {

	if(key==='state'){
		setCountry(e);
	}
	if(key==='category'){
		setCategory(e);
	}
	if(key==='store'){
		setstoreName(e);
	}


    // setSelectedValue(e.value);
	
	console.log(e.value, 'data');
  }






// Sample options for search box
const stateCountry = ['Andhra', 'Bihar', 'Karnataka','Tamil Nadu', 'Kerala', 'Telangana',
 'Maharashtra', 'Punjab','Jammu&Kashmir','West Bengal'];

 const itemCategory = ['Dairy', 'Vegetables', 'Grocery','Household Items', 'Others'];

 const storeOutlets = ['BigBasket', 'Groofers', 'Freshtohome', 'Amazon', 'Reliance', 'more'];
return (
    
	<div style={{ marginTop: '10px' }}>
	<h3>Search State</h3>
	<Autocomplete
		id="dropdown"
		value={country}
		onChange={(e, value)=>handleChange(value, 'state')} 
		// onChange={(event, value) => {
		// 	console.log(event, value);
		//   }}
		style={{ width: 250 }}
		freeSolo
		filterOptions={filterOptions}
		options={stateCountry}
		renderInput={(params) => (
		<TextField {...params}
			variant="outlined"
			label="Select State"
		/>
		)}
	/>

<h3>Item Category</h3>
	<Autocomplete
	value={category}
	onChange={(e, value)=>handleChange(value, 'category')} 
		style={{ width: 250 }}
		freeSolo
		filterOptions={filterOptions}
		options={itemCategory}
		renderInput={(params) => (
		<TextField {...params}
			variant="outlined"
			label="Select Item Category"
		/>
		)}
	/>

<h3> Select Store Outlets</h3>
	<Autocomplete
	value={storeName}
	onChange={(e, value)=>handleChange(value, 'store')} 
		style={{ width: 250, marginBottom: 10}}
		freeSolo
		filterOptions={filterOptions}
		options={storeOutlets}
		renderInput={(params) => (
		<TextField {...params}
			variant="outlined"
			label="Select Store Outlets"
		/>
		)}
	/>

<Button variant="contained" color="primary" onClick={()=>handleSubmit(country,category,storeName)}>
  Submit
</Button>
	</div>
    
);
}

export default DropDown;
