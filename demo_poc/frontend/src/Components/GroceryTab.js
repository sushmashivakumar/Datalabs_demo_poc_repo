import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Box, Card, CardContent, Button } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DownloadIcon from "@mui/icons-material/Download";
import MinimizeIcon from "@mui/icons-material/Minimize";
import ExpandIcon from "@mui/icons-material/Expand";
import { Tooltip } from "@mui/material";
import { fontSize } from "@mui/system";
import axios from "axios";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  console.log("Grocery Props", props);

  const { collapse } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [itemPrice, setItemPrice] = useState("");
  const [discount, setDiscount] = useState();
  const [effectivePrice, setEffectivePrice] = useState();
  const [discountError, setDiscountError] = useState("");
  const [cityData, setCityData] = useState([]);
  const [selectCityID, setSelectCityID] = useState([]);
  const [selectBrandID, setSelectBrandID] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [alldata,setAllData] = useState({})
  const getAllData = (data) => {
    setAllData(data)
  }

  const cities = localStorage.getItem("CITY");
  console.log("CITY", JSON.stringify(cities));
 

  useEffect(() => {});

  const handlePercentageValue = (event, flag) => {
    setEffectivePrice();
    if (flag === "1") {
      setItemPrice(event.target.value);
    } else {
      if (event.target.value <= 80) {
        setDiscount(event.target.value);
        setDiscountError("");
      } else {
        setDiscountError("Discount percentage should not exceed more than 80%");
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCalculate = () => {
    if (itemPrice !== "" && discount !== "" && discount <= 80) {
      let discountPercentage = discount / 100;
      let totalValue = itemPrice - itemPrice * discountPercentage;
      setEffectivePrice(totalValue.toFixed(2));
     
    }
  };

  const handleCityChange = (event, cityID) => {
    console.log("cityID", event);
    console.log("cityID 1", cityID);

    axios
      .post("http://localhost:3000/api/brand_filter", {
        city_id: cityID[0].city_id,
        item_id: props.selectedItem.item_id,
        store_outlet_id: "1",
      })
      .then((response) => {
        if (response.data[0].brand !== undefined) {
          setBrandData(response.data[0].brand);
          setSelectCityID(cityID[0].city_id);
        }else{
          setSelectCityID([])
        }
        console.log("Brand Fileter Response", response);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  };
  const handleBrandChange = (event, val) => {
    
    if (val !== undefined && val !== null && val.brand_id !== undefined) {
      setSelectBrandID(val.brand_id);
    }
  };

  const handleFinalSubmit = (outletId) => {
    axios
      .put("http://localhost:3000/api/update", {
        item_price: itemPrice,
        eff_price: effectivePrice,
        status: "Verified",
        brand_id: selectBrandID,
        discount: discount,
        store_outlet_id: outletId,
        item_id: props.selectedItem.item_id,
        city_id: selectCityID,
      })
      .then((response) => {
        if (response.data[0].brand !== undefined) {
          setBrandData(response.data[0].brand);
        }
        console.log("Brand Fileter Response", response);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  };


  // const handleExport = () => {
  //   if(Object.keys(alldata).length){
  //     const dataSet1 = [
  //         {
  //             State: State.find(state => state.id.toString() === alldata.state.toString())?.state,
  //             Category: CategoryList.find(category => category.id.toString() === alldata.state.toString())?.categoryName,
  //             Item: CategoryItem.find(item => item.id.toString() === alldata.state.toString())?.itemName,
  //             City: City.find(city => city.id.toString() === alldata.state.toString())?.city,
  //             Brand: Brand.find(brand => brand.id.toString() === alldata.state.toString())?.brand,
  //             Price: alldata.price,
  //             Discount: alldata.discount,
  //             EffectivePrice: alldata.effectiveprice,
  //             Verified: alldata.status
  //         },
  //     ];
  //     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //     const fileExtension = '.xlsx';
  //     const ws = XLSX.utils.json_to_sheet(dataSet1);
  //     const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //     const data = new Blob([excelBuffer], {type: fileType});
  //     FileSaver.saveAs(data, 'Export' + fileExtension);
  //    }
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Big Basket" {...a11yProps(0)} />
          <Tab label="Grofers" {...a11yProps(1)} />
          <Box style={{ marginLeft: "auto", padding: "1%", marginRight: 10 }}>
            <i
              id="explorer"
              style={{ padding: 8 }}
              class="bi bi-dash"
              data-toggle="collapse"
              href="#collapseOne"
              onClick={() => collapse(false)}
            />
            <i
              class="bi bi-arrows-angle-expand"
              onClick={() => collapse(true)}
            />
            {/* <i class="bi bi-chevron-down" /> */}

            {/* <Tooltip title="Minimize"><MinimizeIcon onClick={onClickResizeExplorer}/></Tooltip>
          <Tooltip title="Maximize"><ExpandIcon onClick={onClickResizeViewer}/></Tooltip> */}
          </Box>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Card>
          <CardContent>
            <Box display="flex">
              <Box flex={1 / 2}>
                <Typography
                  style={{ fontSize: 18, fontWeight: "bold", color: "#3f51b5" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Selected Item : {props.selectedItem.item_name}
                </Typography>
              </Box>
            </Box>
            {/* <hr /> */}
            <Box
              width="100%"
              mt="20px"
              p="10px"
              boxShadow="0px 0px 2px 2px #BFBFBF"
            >
              <Autocomplete
                sx={{ width: "50%" }}
                multiple
                options={props.cityList}
                getOptionLabel={(option) => option.city_name}
                // onChange={(event, value) => handleCityChange(value)}
                onChange={handleCityChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select City"
                    color="primary"
                    placeholder=""
                  />
                )}
                disabled={!props.filtered ? true : false }
              />
              <Autocomplete
                sx={{ width: "50%", marginTop: 2, marginBottom: 2 }}
                options={brandData}
                getOptionLabel={(option) => option.brand_name}
                onChange={handleBrandChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select Brand"
                    color="primary"
                    placeholder=""
                  />
                )}
                disabled={!props.filtered ? true : false }
              />
            </Box>
            {/* <hr /> */}
            <Box
              width="100%"
              mt="20px"
              p="10px"
              boxShadow="0px 0px 2px 2px #BFBFBF"
            >
              <Typography
                style={{
                  fontSize: 15,
                  marginLeft: "5px",
                  fontWeight: "bold",
                  color: "#3f51b5",
                }}
                color="text.secondary"
                gutterBottom
              >
                Calculate Effective Price
              </Typography>
              <hr />
              <TextField
                sx={{ width: "50%" }}
                name="item_price"
                label="Item Price (₹)"
                variant="standard"
                onChange={(event) => {
                  handlePercentageValue(event, "1");
                }}
                disabled={!props.filtered ? true : false }
              />{" "}
              <br />
              <TextField
                sx={{ width: "50%", marginTop: "10px" }}
                name="discount"
                label="Discount (%)"
                variant="standard"
                onChange={(event) => {
                  handlePercentageValue(event, "2");
                }}
                value={discount}
                autoComplete={'off'}
                disabled={!props.filtered ? true : false }
              />
              <br />
              {discountError !== "" ? (
                <span
                  className="text-danger"
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  Discount percentage should not exceed more than 80%
                </span>
              ) : null}
              <br />
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "20%",
                  marginTop: 10,
                  backgroundColor: "#3f51b5",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
                onClick={() => handleCalculate()}
                disabled={!props.filtered ? true : false }
              >
                Calculate
              </Button>
              <br />
              <br />
              {itemPrice && discount && effectivePrice > 0 ? (
                <Box style={{ marginTop: 10, fontSize: 16, color: "#3f51b5" }}>
                  Effective Price: ₹ {effectivePrice}
                </Box>
              ) : null}
            </Box>
            <Box flex={1 / 2}>
              <Button
                onClick={()=>handleFinalSubmit(1)}
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "30%",
                  // float: "right",
                  marginTop: "5px",
                  marginBottom: "10px",
                  backgroundColor: "#1a237e",
                }}
                disabled={!props.filtered ? true : false }
              >
                Submit
              </Button>
              
              <Button
                onClick={()=> handleExport()}
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "10%",
                  // float: "right",
                  marginTop: "5px",
                  marginBottom: "10px",
                  backgroundColor: "#1a237e",
                }}
                // disabled={!props.filtered ? true : false }
              >
              
                Export
                </Button>
              

            </Box>
          
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card>
          <CardContent>
            <Box display="flex">
              <Box flex={1 / 2}>
                <Typography
                  style={{ fontSize: 18, fontWeight: "bold", color: "#3f51b5" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Selected Item : {props.selectedItem.item_name}
                </Typography>
              </Box>
            </Box>
            {/* <hr /> */}
            <Box
              width="100%"
              mt="20px"
              p="10px"
              boxShadow="0px 0px 2px 2px #BFBFBF"
            >
              <Autocomplete
                sx={{ width: "50%" }}
                multiple
                options={props.cityList}
                getOptionLabel={(option) => option.city_name}
                // onChange={(event, value) => handleCityChange(value)}
                onChange={handleCityChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select City"
                    color="primary"
                    placeholder=""
                  />
                )}
              />
              <Autocomplete
                sx={{ width: "50%", marginTop: 2, marginBottom: 2 }}
                options={brandData}
                getOptionLabel={(option) => option.brand_name}
                onChange={handleBrandChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select Brand"
                    color="primary"
                    placeholder=""
                  />
                )}
              />
            </Box>
            {/* <hr /> */}
            <Box
              width="100%"
              mt="20px"
              p="10px"
              boxShadow="0px 0px 2px 2px #BFBFBF"
            >
              <Typography
                style={{
                  fontSize: 15,
                  marginLeft: "5px",
                  fontWeight: "bold",
                  color: "#3f51b5",
                }}
                color="text.secondary"
                gutterBottom
              >
                Calculate Effective Price
              </Typography>
              <hr />
              <TextField
                sx={{ width: "50%" }}
                name="item_price"
                label="Item Price (₹)"
                variant="standard"
                onChange={(event) => {
                  handlePercentageValue(event, "1");
                }}
              />{" "}
              <br />
              <TextField
                sx={{ width: "50%", marginTop: "10px" }}
                name="discount"
                label="Discount (%)"
                variant="standard"
                onChange={(event) => {
                  handlePercentageValue(event, "2");
                }}
                value={discount}
              />
              <br />
              {discountError !== "" ? (
                <span
                  className="text-danger"
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  Discount percentage should not exceed more than 80%
                </span>
              ) : null}
              <br />
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "20%",
                  marginTop: 10,
                  backgroundColor: "#3f51b5",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
                onClick={() => handleCalculate()}
              >
                Calculate
              </Button>
              <br />
              <br />
              {itemPrice && discount && effectivePrice > 0 ? (
                <Box style={{ marginTop: 10, fontSize: 16, color: "#3f51b5" }}>
                  Effective Price: ₹ {effectivePrice}
                </Box>
              ) : null}
            </Box>
            <Box flex={1 / 2}>
              <Button
                onClick={() =>handleFinalSubmit(2)}
                variant="contained"
                color="primary"
                style={{
                  float: "right",
                  marginTop: "5px",
                  marginBottom: "10px",
                  backgroundColor: "#1a237e",
                }}
              >
                Submit
              </Button>
            </Box>
           
        
           
          </CardContent>
        </Card>
      </TabPanel>
    </div>
  );
}
