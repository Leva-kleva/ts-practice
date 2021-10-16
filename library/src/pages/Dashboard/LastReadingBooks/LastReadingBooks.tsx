import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import { getLastReadingBooks } from '../../../services/getLastReadingBooks';

// Generate Order Data
function createData(id: number, date: string, name: string, author: string) {
  return { id, date, name, author };
}

function Orders() {
  const [rows, setRows] = React.useState<Array<any>>([]);
  React.useEffect(() => {
    const asyncFunc = async () => {
      const response = await getLastReadingBooks();
      if (response) {
        console.log('response: ', response);
        setRows(
          response.data.map((item: any) =>
            createData(item.id, '16 Mar, 2019', item.name, item.author)
          )
        );
      }
    };
    asyncFunc();
  }, []);
  return rows.length ? (
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
  ) : (
    <h3>У вас нет прочитанных книг </h3>
  );
}

type WishListResultProps = {};

export const LastReadingBooks: React.FC<WishListResultProps> = ({}) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ mb: 1 }}>
          Ваши последние прочитанные книги
        </Grid>
      </Grid>
      <Orders />
    </Box>
  );
};
