import React, { useState } from "react";
import Iframe from "react-iframe";
import moment from "moment";
// import styles from "./App.css";
import "./App.css";
import { toolsMenuData } from "./Mockdata/index";
import Dropdown from "./Components/Dropdown/Dropdown";
import GroceryTab from "./Components/GroceryTab";
import { Grid, Box } from "@material-ui/core";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { fontSize } from "@mui/system";
import Appbar from "./Components/Appbar";

export default function App() {
  // const [myToolsdata, setMyToolsdata] = useState(toolsMenuData);
  // const [selectedtool, setSelectedTool] = useState({});
  // console.log(
  //   "moment ",
  //   moment("2021-01-02T07:57:45.121Z").format("DD MMM YYYY"),
  //   myToolsdata
  // );

  // const onClickTool = (toolID) => {
  //   const foundTool = myToolsdata?.find((item) => item.id === toolID);
  //   setSelectedTool(foundTool);
  //   console.log("foundTool ", foundTool);
  // };
  const [isResize, setResize] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");
  const [cityList, setCityList] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const collapse = (value) => {
    setResize(value);
  };

  const getUpdated = (val, flag) => {
    console.log("getUpdated", val);
    if (flag === "1") setSelectedItem(val);
    if (flag == "2") {
      // console.log("UPEN",val)
      // if (val.data[0].city_list !== undefined) {
      //   console.log("UPEN AFTER", val.data[0].city_list)
      //   setCityList(val.data[0].city_list);
      // }else{
      //   setCityList([]);
      // }
      setFiltered(true)
      setCityList(val);
    }
  };

  return (
    <div>
      <Appbar />
      <Box display="flex" p="10px" className="root-container">
        {!isResize ? (
          <Box width="30%" mt="17px" boxShadow="0px 0px 2px 2px #BFBFBF">
            <Box
              style={{ background: "#3f51b5", color: "#ffffff", padding: 6 }}
            >
              <span style={{ paddingLeft: 10, fontSize: 20 }}>
                {" "}
                Filter Item
              </span>
              <span style={{ float: "right" }}>
                <FilterAltIcon />
              </span>
            </Box>

            <Dropdown getUpdated={getUpdated} />
          </Box>
        ) : null}

        <Box
          ml="10px"
          width={isResize ? "100%" : "70%"}
          mt="17px"
          boxShadow="0px 0px 2px 2px #BFBFBF"
        >
          <GroceryTab
            cityList={cityList}
            selectedItem={selectedItem}
            collapse={collapse}
            filtered={filtered}
          />
           
        </Box>
         
      </Box>
    </div>
  );
}
