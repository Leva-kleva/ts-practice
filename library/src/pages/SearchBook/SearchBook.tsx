import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Paper, Grid, Button, TextField, Chip } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { searchBook } from '../../services/searchBook';
import { visuallyHidden } from '@mui/utils';
import {
  setAlertBody,
  setAlertSeverity,
  setAlertTitle,
  setOpenAlert,
} from '../../redux/ducks/common';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getAuthors } from '../../services/getAuthors';

interface Data {
  id: number;
  title: string;
  author: string;
  inStore: string;
}

function createData(
  id: number,
  title: string,
  author: string,
  inStore: string
): Data {
  return {
    id,
    title,
    author,
    inStore,
  };
}

const rows = [
  createData(0, 'Cupcake', 'Frozen yoghurt', 'true'),
  createData(1, 'Cupcake1', 'Frozen yoghurt', 'true'),
  createData(2, 'Cupcake2', 'Frozen yoghurt', 'true'),
  createData(3, 'Cupcake3', 'Frozen yoghurt', 'true'),
  createData(4, 'Cupcake4', 'Frozen yoghurt', 'false'),
  createData(5, 'Cupcake5', 'Frozen yoghurt', 'false'),
  createData(6, 'Cupcake6', 'Frozen yoghurt', 'false'),
  createData(7, 'Cupcake7', 'Frozen yoghurt', 'false'),
  createData(8, 'Cupcake8', 'Frozen yoghurt', 'false'),
  createData(9, 'Cupcake9', 'Frozen yoghurt', 'false'),
  createData(10, 'Cupcake10', 'Frozen yoghurt', 'true'),
  createData(11, 'Cupcake11', 'Frozen yoghurt', 'true'),
  createData(12, 'Cupcake12', 'Frozen yoghurt', 'true'),
  createData(13, 'Cupcake13', 'Frozen yoghurt', 'true'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: '№',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Название',
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Автор',
  },
  {
    id: 'inStore',
    numeric: false,
    disablePadding: false,
    label: 'В наличие',
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Найденные книги
      </Typography>
    </Toolbar>
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.title}</TableCell>

                      <TableCell>{row.author}</TableCell>
                      <TableCell>
                        {row.inStore === 'true' ? (
                          <Chip
                            label="в наличие"
                            color="success"
                            variant="outlined"
                          />
                        ) : (
                          <Chip
                            label="Нет в наличии"
                            color="error"
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

type BasicSelectProps = {
  author: string;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
};

const BasicSelect: React.FC<BasicSelectProps> = ({ author, setAuthor }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setAuthor(event.target.value as string);
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Автор</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={author}
          label="Выберите автора"
          onChange={handleChange}
        >
          {names.map((name) => (
            <MenuItem value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

type SearchBookProps = {};

export const SearchBook: React.FC<SearchBookProps> = ({}) => {
  const dispatch = useDispatch();

  const [author, setAuthor] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [names, setNames] = React.useState<Array<{ name: string; id: number }>>(
    []
  );
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTitle(event.target.value);

  React.useEffect(() => {
    if (!names) {
      const asyncfunc = async () => {
        const response = await getAuthors();
        if (response) {
          setNames(response);
        } else {
          dispatch(setAlertSeverity('error'));
          dispatch(setOpenAlert(true));
          dispatch(setAlertBody('Проблемы с сервером, попробуйте позже'));
          dispatch(setAlertTitle('Ой!'));
        }
      };
      asyncfunc();
    }
  }, []);

  const handleSearch = async () => {
    if (author && title.trim() && names.length) {
      const authorId = names.find(({ name }) => name === author)!.id;
      const response = await searchBook({
        name: title,
        author: authorId,
      });
      if (response) {
        const filteredBooks = response.books || rows;
        dispatch(setAlertSeverity('success'));
        dispatch(setOpenAlert(true));
        dispatch(setAlertBody('Нам удалось найти то, что вы искали'));
        dispatch(setAlertTitle('Получилось!'));
      } else {
        dispatch(setAlertSeverity('error'));
        dispatch(setOpenAlert(true));
        dispatch(setAlertBody('По Вашему запросу не нашлось подходящих книги'));
        dispatch(setAlertTitle('Ой!'));
      }
    }
  };
  return (
    <Box sx={{ width: '100%', mt: 8, maxHeight: '100vh', overflow: 'auto' }}>
      <Paper sx={{ width: '100%', p: 2, pb: 8, position: 'relative' }}>
        <Grid item container xs={12} sx={{ mb: 2 }}>
          Поиск книги в библиотеке
        </Grid>
        <BasicSelect {...{ author, setAuthor }} />
        <TextField
          label="Название книги"
          value={title}
          placeholder="Введите название"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <Grid
          item
          container
          xs={2}
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
        >
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Найти
          </Button>
        </Grid>
      </Paper>
      <Paper sx={{ width: '100%', p: 2 }}>
        <Grid item container xs={12}>
          {true && <EnhancedTable />}
        </Grid>
      </Paper>
    </Box>
  );
};
