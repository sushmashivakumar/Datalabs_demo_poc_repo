// import logo from './logo.svg';
import React, { Component } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Tabs from '../Tabs/Tabs';
import FileUpload from '../FileUpload/FileUploadPage';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        rowData: [
            {Itemname: "Milk", brandname: "Amul", quantity: "1ltr", price: 22.00},
            {Itemname: "Apples", brandname: "", quantity: "2kg", price: 200.00},
            {Itemname: "Onion", brandname: "", quantity: "1kg", price: 35.00}
            
        ]
    }
}

// componentDidMount() {
//   fetch('https://www.ag-grid.com/example-assets/row-data.json')
//       .then(result => result.json())
//       .then(rowData => this.setState({rowData}))
// }


  render() {
      return (
          <div>
          <div>
            <FileUpload></FileUpload>
            <Dropdown></Dropdown>
              
          </div>
          <div
              className="ag-theme-balham"
              style={{ height: '200px', width: '800px' }}
          >
              

              <Tabs></Tabs>
          </div>
          </div>
      );
  }
}


export default App;
