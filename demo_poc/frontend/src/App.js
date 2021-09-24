import React, { useState } from "react";
import Iframe from "react-iframe";
import moment from "moment";
// import styles from "./App.css";
import "./App.css";
import { toolsMenuData } from "./Mockdata/index";
import Dropdown from "./Components/Dropdown/Dropdown"
import GroceryTab from "./Components/GroceryTab";
import { Grid, Box ,} from '@material-ui/core';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { fontSize } from "@mui/system";
import Appbar from './Components/Appbar'
export default function App() {
  const [myToolsdata, setMyToolsdata] = useState(toolsMenuData);
  const [selectedtool, setSelectedTool] = useState({});
  console.log(
    "moment ",
    moment("2021-01-02T07:57:45.121Z").format("DD MMM YYYY"),
    myToolsdata
  );

  const onClickTool = (toolID) => {
    const foundTool = myToolsdata?.find((item) => item.id === toolID);
    setSelectedTool(foundTool);
    console.log("foundTool ", foundTool);
  };

  return (
    <div>
        <Appbar />
      <Box display="flex" p="10px" className="root-container">
       
        <Box width="30%" mt="17px" boxShadow="0px 0px 2px 2px #BFBFBF">
            <Box style={{background:"rgb(63 82 181 / 1)", color: "#ffffff", padding:6}} >
                <span style={{paddingLeft:10, fontSize:22}}> Filter Item</span>
                <span style={{float:"right"}}><FilterAltIcon /> </span></Box>
            
            <Dropdown />
            </Box>
            <Box  ml="10px" width="70%" mt="17px" boxShadow="0px 0px 2px 2px #BFBFBF">
           < GroceryTab />
                </Box>
           
            </Box>
    </div>
    
  );
}
