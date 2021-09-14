import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { State, CategoryList, CategoryItem } from "../../Mockdata";


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
  const [formData, setFormData] = useState({
    state: "",
    category: "",
    item: "",
  });

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
      handleFilterData(formData);
    }
    // console.log(formData, 'data from')
  };

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
          value={formData.state}
          onChange={handleChange}
          label="Age"
          inputProps={{
            name: "state",
            id: "outlined-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          {State.map((state) => (
            <option value={state.id}>{state.state}</option>
          ))}
        </Select>
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
