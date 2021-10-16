import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getQuestions } from '../../../services/getQuestions';

function createData(
  date: string,
  title: string,
  message: string,
  email: string
) {
  return { date, title, message, email };
}

function BasicTable() {
  const [rows, setRows] = React.useState<Array<any>>([]);
  React.useEffect(() => {
    const asyncfunc = async () => {
      const response = await getQuestions();
      if (response) {
        setRows(
          response.map((item: any) =>
            createData(item['dttm'], item.header, item.messagem, item.email)
          )
        );
      }
    };
    asyncfunc();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Вопросы</TableCell>
            <TableCell align="right">Дата</TableCell>
            <TableCell align="right">Тема</TableCell>
            <TableCell align="right">Вопрос</TableCell>
            <TableCell align="right">email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.date.slice(0, 16)}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.message}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type AllQuestionsProps = {};

export const AllQuestions: React.FC<AllQuestionsProps> = ({}) => {
  return (
    <Paper sx={{ p: 1, mt: 8, width: '100%' }}>
      <BasicTable />
    </Paper>
  );
};
