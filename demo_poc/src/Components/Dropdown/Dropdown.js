import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

const App = () => {

const filterOptions = createFilterOptions({
	matchFrom: 'start',
	stringify: option => option,
});

// Sample options for search box
const stateCountry = ['Andhra', 'Bihar', 'Karnataka','Tamil Nadu', 'Kerala', 'Telangana',
 'Maharashtra', 'Punjab','Jammu&Kashmir','West Bengal'];

 const itemCategory = ['Dairy', 'Vegetables', 'Grocery','Household Items', 'Others'];

 const storeOutlets = ['BigBasket', 'Groofers', 'Freshtohome', 'Amazon', 'Reliance', 'more'];
return (
    
	<div style={{ marginLeft: '10%', marginTop: '60px' }}>
	<h3>Search State</h3>
	<Autocomplete
		style={{ width: 300 }}
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
		style={{ width: 300 }}
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
		style={{ width: 300, marginBottom: 10}}
		freeSolo
		filterOptions={filterOptions}
		options={storeOutlets}
		renderInput={(params) => (
		<TextField {...params}
			variant="outlined"
			label="Select Item Category"
		/>
		)}
	/>

<Button variant="contained" color="primary">
  Submit
</Button>
	</div>
    
);
}

export default App
