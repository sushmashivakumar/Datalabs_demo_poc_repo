import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const DISCOUNT_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }
// getPrice = function() {
//   var numVal1 = Number(document.getElementById("price").value);
//   var numVal2 = Number(document.getElementById("discount").value) / 100;

//   var totalValue = numVal1 - (numVal1 * numVal2)
//   document.getElementById("total").value = totalValue.toFixed(2);
// }

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Milk', 'Amul', 1.00)
  
];

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = DISCOUNT_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Item Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              
            </TableRow>
          ))}

          {/* <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discount rate</TableCell>
            <TableCell align="right">{`${(DISCOUNT_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}