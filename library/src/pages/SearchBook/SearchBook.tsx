import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Paper, Grid, Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { search } from '../../services/search';
import {
  setAlertBody,
  setAlertSeverity,
  setAlertTitle,
  setOpenAlert,
} from '../../redux/ducks/common';
import { alpha } from '@mui/material/styles';
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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { deleteSelectedBooksFromWish } from '../../services/deleteSelectedBooksFromWish';
import { fetchAccountData } from '../../redux/ducks/authentication';

interface Data {
  id: number;
  title: string;
  author: string;
}

function createData(id: number, title: string, author: string): Data {
  return {
    id,
    title,
    author,
  };
}

const rows = [
  createData(0, 'Cupcake', 'Frozen yoghurt'),
  createData(1, 'Cupcake1', 'Frozen yoghurt'),
  createData(2, 'Cupcake2', 'Frozen yoghurt'),
  createData(3, 'Cupcake3', 'Frozen yoghurt'),
  createData(4, 'Cupcake4', 'Frozen yoghurt'),
  createData(5, 'Cupcake5', 'Frozen yoghurt'),
  createData(6, 'Cupcake6', 'Frozen yoghurt'),
  createData(7, 'Cupcake7', 'Frozen yoghurt'),
  createData(8, 'Cupcake8', 'Frozen yoghurt'),
  createData(9, 'Cupcake9', 'Frozen yoghurt'),
  createData(10, 'Cupcake10', 'Frozen yoghurt'),
  createData(11, 'Cupcake11', 'Frozen yoghurt'),
  createData(12, 'Cupcake12', 'Frozen yoghurt'),
  createData(13, 'Cupcake13', 'Frozen yoghurt'),
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
    disablePadding: true,
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
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
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

interface EnhancedTableToolbarProps {
  numSelected: number;
  selectedItems: Data[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const dispatch = useDispatch();
  const { numSelected, selectedItems } = props;
  const handleDelete = async () => {
    const deletingIndexes = selectedItems.map((item) => +item);
    const response = await deleteSelectedBooksFromWish({
      indexes: deletingIndexes,
    });
    if (response) {
      dispatch(fetchAccountData());
    } else {
      dispatch(setAlertSeverity('error'));
      dispatch(setOpenAlert(true));
      dispatch(setAlertBody('Не удалось удалить, попробуйте позже'));
      dispatch(setAlertTitle('Что-то пошло не так'));
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} выбрано
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Найденные книги
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => String(n.id));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedItems={selected as any}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(String(row.id));
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, String(row.id))}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.author}</TableCell>
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
  const handleSearch = async () => {
    if (author && title.trim()) {
      const response = await search({
        title,
        author,
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

  const [author, setAuthor] = React.useState('');
  const [title, setTitle] = React.useState('');
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTitle(event.target.value);
  return (
    <Box sx={{ width: '100%', mt: 8 }}>
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
