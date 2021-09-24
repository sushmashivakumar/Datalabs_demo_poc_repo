import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Box, Card, CardContent, Button } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DownloadIcon from '@mui/icons-material/Download';
import MinimizeIcon from '@mui/icons-material/Minimize';
import ExpandIcon from '@mui/icons-material/Expand';
import { Tooltip } from '@mui/material';

const cities = [
  { title: "City A", id: 1994 },
  { title: "City B", id: 1972 },
  { title: "City C", id: 1974 },
  { title: "City D", id: 2008 },
  { title: "City 5", id: 1957 },
  { title: "City 6", id: 1993 },
];
const brand = [
  { title: "Brand A", id: 1994 },
  { title: "Brand B", id: 1972 },
  { title: "Brand C", id: 1974 },
  { title: "Brand D", id: 2008 },
  { title: "Brand 5", id: 1957 },
  { title: "Brand 6", id: 1993 },
];

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
  const [tableData, setTableData] = React.useState({
    brand: "",
    city: "",
    price: "",
    discount: "",
    effectiveprice: "",
    status: "Not Verified",
  });

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCalculate = () => {
    // if (tableData.price !== "" && tableData.discount !== "") {
    //   let discountPercentage = tableData.discount / 100;
    //   let totalValue = tableData.price - tableData.price * discountPercentage;
    //   const final = { ...tableData, effectiveprice: totalValue };
    //   setTableData(final);
    //   getAllDataEvent({ ...data, ...final });
    // }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Big Basket" {...a11yProps(0)} />
          <Tab label="Grofers" {...a11yProps(1)} />
          <Box style={{marginLeft:"auto", padding:"1%"}}>
          <Tooltip title="Minimize"><MinimizeIcon /></Tooltip>
          <Tooltip title="Maximize"><ExpandIcon /></Tooltip>
          </Box>
        </Tabs>
        
      </AppBar>
      <TabPanel value={value} index={0}>
        <Card>
          <CardContent>
            <Box display="flex">
              <Box flex={1 / 2}>
                <Typography
                  style={{ fontSize: 18, fontWeight:"bold" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Selected Item : Milk
                </Typography>
              </Box>
              <Box flex={1 / 2}>
                <Button variant="contained" color="primary"
              style={{ float:"right", marginTop:"-5px"}} endIcon={<DownloadIcon />}>
                  Export
                </Button>
              </Box>
            </Box>
            <hr />
            <Autocomplete
              sx={{ width: "50%" }}
              multiple
              options={cities}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select City"
                  placeholder=""
                />
              )}
            />
            <Autocomplete
              sx={{ width: "50%", marginTop: 2 }}
              options={brand}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Brand"
                  placeholder=""
                />
              )}
            />
            <TextField
              sx={{ width: "50%", marginTop: 2 }}
              name="item_price"
              label="Item Price"
              variant="standard"
            />{" "}
            <br />
            <TextField
              sx={{ width: "50%", marginTop: 2 }}
              name="discount"
              label="Discount (%)"
              variant="standard"
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 10, marginTop: 28 }}
              onClick={() => handleCalculate()}
            >
              Calculate
            </Button>
            <div>
              {tableData.effectiveprice !== "" ? (
                <span>Effecttive Price : {tableData.effectiveprice} </span>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Card>
          <CardContent>
            <Box display="flex">
              <Box flex={1 / 2}>
                <Typography
                  style={{ fontSize: 18, fontWeight:"bold" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Selected Item : Milk
                </Typography>
              </Box>
              <Box flex={1 / 2}>
                <Button variant="contained" color="primary"
              style={{ float:"right", marginTop:"-5px"}} endIcon={<DownloadIcon />}>
                  Export
                </Button>
              </Box>
            </Box>
            <hr />
            <Autocomplete
              sx={{ width: "50%" }}
              multiple
              options={cities}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select City"
                  placeholder=""
                />
              )}
            />
            <Autocomplete
              sx={{ width: "50%", marginTop: 2 }}
              options={brand}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Brand"
                  placeholder=""
                />
              )}
            />
            <TextField
              sx={{ width: "50%", marginTop: 2 }}
              name="item_price"
              label="Item Price"
              variant="standard"
            />{" "}
            <br />
            <TextField
              sx={{ width: "50%", marginTop: 2 }}
              name="discount"
              label="Discount (%)"
              variant="standard"
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 10, marginTop: 28 }}
              onClick={() => handleCalculate()}
            >
              Calculate
            </Button>
            <div>
              {tableData.effectiveprice !== "" ? (
                <span>Effecttive Price : {tableData.effectiveprice} </span>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </TabPanel>
    </div>
  );
}
