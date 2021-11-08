import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NUMBER_OF_DAYS, rows, weekends } from '../shared/constants';


export default function BasicTable() {
  function fillValuesWithZeros() {
    let vals = [];
    rows.map((row) => {
      let arr = []
      for (let i = 1; i < NUMBER_OF_DAYS; i++) {
        arr.push(0)
      }
      vals.push([row, arr]);
    });
    return vals;
  }
  
  function getValue(row, day) {
    if(!isWeekend(day)) {
      for (let index = 0; index < values.length; index++) {
        if(values[index][0] === row) {
          if(values[index][1][day - 1] !==0) {
            return values[index][1][day - 1];
          }
          // Rendering blank rather than 0
          return '';
        }
      }

      return '';
    }
  }

  function nextValue(prevValue) {
    switch (prevValue) {
      case 0:
        return 1;
      case 1:
        return 0.5;
      case 0.5:
        return 1.5;
      case 1.5:
        return 0;
      default:
        return 0;
    }
  }
  
  function toggle(row, day) {
      let vals = Object.create(values);
      for (let index = 0; index < vals.length; index++) {
        if(vals[index][0] === row) {
          vals[index][1][day - 1] = nextValue(vals[index][1][day - 1]);
          break;
        }
      }
      setValues(vals);
  }

  function isWeekend(day) {
    if (!weekends.includes(day)) {
      return false;
    }
    return true;
  }

  const days = [];
  for (let i = 1; i < NUMBER_OF_DAYS; i++) {
    days.push(i);
  }

  function selectAll(row) {
    let vals = Object.create(values);
    for (let index = 0; index < vals.length; index++) {
      if(vals[index][0] === row) {
        for (let i = 0; i < NUMBER_OF_DAYS; i++) {
          if(!(isWeekend(vals[index][1][i - 1]) === '')) {
            vals[index][1][i - 1] = 1;
          }
          else {
            vals[index][1][i - 1] = 0;
          }
        }
        break;
      }
    }
    setValues(vals);
  }

  const [values, setValues] = useState([]);
  useEffect(() => {
    setValues(fillValuesWithZeros());
  }, []);
  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Jours du mois</TableCell>
              {days.map((day) => (
              <TableCell align="right" key={day}>{day}</TableCell>
              ))}
              <TableCell>Sélectionner tous</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell key={row} component="th" scope="row">
                  {row}
                </TableCell>
                {days.map((day) => {
                  return (
                    <TableCell key={day + row} className={(isWeekend(day) ? "gray-cell" : '') + " " + (getValue(row, day) !== ''&&!isWeekend(day) ? 'selected-cell' : '')} align="right" onClick={()=>toggle(row, day)}>{getValue(row, day)}</TableCell>
                  )
                })}
                <TableCell key={row + "selectall"} onClick={()=>selectAll(row)}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

  );
}