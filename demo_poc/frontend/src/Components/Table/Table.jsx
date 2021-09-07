import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {sampleData} from '../../data';


const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});


function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, city, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, city, qty, unit, price };
}

// function subtotal(items) {
//   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const rows = [
//   createRow('Milk', 'Bengaluru','Amul', 1.00, 22.00)
  
// ];



export default function SpanningTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          {/* <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Item Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              
            </TableRow>
          ))}

         
        </TableBody>
      </Table>
    </TableContainer>
  );
}