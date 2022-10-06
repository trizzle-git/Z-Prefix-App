import * as React from 'react';
import { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { TopBar } from '../components/TopBar';
import { Context } from '../context/Context';

const ItemDetails = () => {
    const { item, setAppTitle } = useContext(Context);
    setAppTitle('Item Details');

    return(
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <TopBar/>
        <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell><h2 style={{fontSize:'20px'}}>Item</h2></TableCell>
                <TableCell><h2 style={{fontSize:'20px'}}>Qty</h2></TableCell>
                <TableCell><h2 style={{fontSize:'20px'}}>Description</h2></TableCell>
                <TableCell><h2 style={{fontSize:'20px'}}>UserID</h2></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            <TableRow key={item.id} style={{ cursor: 'pointer' }}>
                                <TableCell ><h3 style={{fontSize:'15px'}}>{item.name}</h3></TableCell>
                                <TableCell ><h3 style={{fontSize:'15px'}}>{item.quantity}</h3></TableCell>
                                <TableCell ><h3 style={{fontSize:'15px'}}>{item.description}</h3></TableCell>
                                <TableCell ><h3 style={{fontSize:'15px'}}>{item.user_id}</h3></TableCell>
                            </TableRow>
            </TableBody>
        </Table>
        </Box>
    )
}

export default ItemDetails