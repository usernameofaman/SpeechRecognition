import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({ data, setSelectedSession }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Created at</TableCell>
                        <TableCell align="right">Question Count</TableCell>
                        <TableCell align="right">Final Disorders</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            onClick={() => setSelectedSession(row)}
                            key={row.userName}
                            sx={{ cursor:"pointer", '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.userName}
                            </TableCell>
                            <TableCell align="right">{row.createdAt}</TableCell>
                            <TableCell align="right">{row.questionsCount}</TableCell>
                            <TableCell align="right">{row.final.join(',')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
