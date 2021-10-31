import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from "@mui/material";
import { Button } from "@mui/material";
import TableDropdown from "./TableDropdown";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const BookList = ({ list, onDelete }) => {
    return <div className="knjizice">
        {list.map((row) => (
            <Card className="card" key={row.id}>
                <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                        {row.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {row.author}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {row.publishDate}
                    </Typography>
                    <Typography variant="body2">
                        {row.rating}
                        <br />
                        <button>
                            <TableDropdown text="..."
                                items={
                                    [
                                        { text: "Pregledaj...", link: true, path: `/book/${row.id}/view` },
                                        { text: "Izmeni...", link: true, path: `/book/${row.id}/edit` },
                                        { text: "Obrisi", link: false, action: () => onDelete(row.id) }
                                    ]
                                }
                            />
                        </button>
                    </Typography>
                </CardContent>
            </Card>
        ))}
    </div>;
}

/*<TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }}>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Naziv</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Zanr</TableCell>
                <TableCell>Objavljena</TableCell>
                <TableCell>Ocena</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Dostupno</TableCell>
                <TableCell>Stranica</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {list.map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>{row.genre}</TableCell>
                    <TableCell>{row.publishDate}</TableCell>
                    <TableCell>{row.rating}</TableCell>
                    <TableCell>{row.isbn}</TableCell>
                    <TableCell>{row.available}</TableCell>
                    <TableCell>{row.pages}</TableCell>
                    <TableCell>

                        <TableDropdown text="..."
                            items={
                                [
                                    { text: "Pregledaj...", link: true, path: `/book/${row.id}/view` },
                                    { text: "Izmeni...", link: true, path: `/book/${row.id}/edit` },
                                    { text: "Obrisi", link: false, action: () => onDelete(row.id) }
                                ]
                            }
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
    </div >
}

*/export default BookList;