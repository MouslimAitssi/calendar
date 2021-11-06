import { TableCell } from '@mui/material';
import * as React from 'react';


export default function CustomTableCell(props) {

    return (
        <TableCell align="right" onClick={()=>props.toggle(props.row, props.day)}>{props.value}</TableCell>
    )
}