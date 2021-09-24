import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CategoryItem, City, Brand, ActualData } from "../../Mockdata";
import { Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dropdown from "../Dropdown/Dropdown";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  InputLabel: {
    minWidth: 100,
  },
  effectiveprice: {
    marginTop: theme.spacing(2),
  },
}));

export default function SpanningTable(props) {
  const { data, getAllDataEvent } = props;
  const classes = useStyles();
  const [tableData, setTableData] = React.useState({
    brand: "",
    city: "",
    price: "",
    discount: "",
    effectiveprice: "",
    status: "Not Verified",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setTableData({
      ...tableData,
      [name]: event.target.value,
    });
  };

  const [cityList, setCityList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  const handleCalculate = () => {
    if (tableData.price !== "" && tableData.discount !== "") {
      let discountPercentage = tableData.discount / 100;
      let totalValue = tableData.price - tableData.price * discountPercentage;
      const final = { ...tableData, effectiveprice: totalValue };
      setTableData(final);
      getAllDataEvent({ ...data, ...final });
    }
  };

  // const handleInputEvent = (value, key) => {
  //   let dt = { ...tableData };
  //   if (!isNaN(value)) {
  //     if (key === "price") {
  //       dt = { ...dt, status: "Verified" };
  //     }
  //     setTableData({
  //       ...dt,
  //       [key]: value,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (typeof data !== "undefined" && Object.keys(data).length) {
  //     const filterResult = ActualData.find(
  //       (d) =>
  //         d.state.toString() === data.state.toString() &&
  //         d.item.toString() === data.item.toString() &&
  //         d.category.toString() === data.category.toString()
  //     );
  //     setCityList(
  //       City.filter((city) => city.state.toString() === data.state.toString())
  //     );
  //     setBrandsList(
  //       Brand.filter(
  //         (brandlist) => brandlist.itemId.toString() === data.item.toString()
  //       )
  //     );
  //     if (typeof filterResult !== "undefined") {
  //       setTableData({ ...tableData, price: filterResult.price });
  //     }
  //   }
  // }, [data]);

  console.log(props.filterData, "this is filter data");
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography variant="h6" component={"h6"} gutterBottom>
            Item:
            {typeof data !== "undefined" && Object.keys(data).length
              ? CategoryItem?.find(
                  (category) => category?.id?.toString() === data?.item?.toString()
                )?.itemName
              : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              htmlFor="outlined-age-native-simple"
              className={classes.InputLabel}
            >
              Select City
            </InputLabel>
            <Select
              native
              value={tableData.city}
              onChange={handleChange}
              label="city"
              inputProps={{
                name: "city",
                id: "outlined-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              {cityList.map((clist) => (
                <option value={clist.id}>{clist.city}</option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Select Brand
              </InputLabel>
              <Select
                native
                value={tableData.brand}
                onChange={handleChange}
                label="brand"
                inputProps={{
                  name: "brand",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {brandsList.map((clist) => (
                  <option value={clist.id}>{clist.brand}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>S
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              id="price"
              name="price"
              label="Item Price in INR"
              defaultValue={tableData.price}
              value={tableData.price}
              onChange={(e) => handleInputEvent(e.target.value, "price")}
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id="discount"
                name="discount"
                label="Enter Discount in %"
                defaultValue={tableData.discount}
                value={tableData.discount}
                onChange={(e) => handleInputEvent(e.target.value, "discount")}
                fullWidth
                autoComplete="shipping address-line2"
              />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCalculate()}
                >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.effectiveprice}>
        <div>
          <Grid item xs={12}>
            <Typography variant="h6" component={"h6"} gutterBottom>
              {tableData.effectiveprice !== "" ? (
                <span>
                  Effective Price : ₹ {tableData.effectiveprice.toFixed(2)}{" "}
                </span>
              ) : null}
            </Typography>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}
