import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import { ROUTE_NAMES } from '../../../constants/routeNames';
import { useHistory } from 'react-router';

// Generate Order Data
function createData(id: number, date: string, name: string, author: string) {
  return { id, date, name, author };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', '16 Mar, 2019'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK'),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA'),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN'),
];

function Orders() {
  const history = useHistory();
  const { wishList } = ROUTE_NAMES.AUTHORISET;
  return (
    <div style={{ position: 'relative' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Автор</TableCell>
            <TableCell>Название книги</TableCell>
            <TableCell align="right">Дата</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        onClick={() => history.push(wishList)}
        sx={{ position: 'absolute', right: 0, bottom: '-60px' }}
      >
        Посмотреть все книги в wish-листе
      </Link>
    </div>
  );
}

type WishListResultProps = {};

export const WishListResult: React.FC<WishListResultProps> = ({}) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ mb: 1 }}>
          Ваш Wish лист
        </Grid>
      </Grid>
      <Orders />
    </Box>
  );
};
