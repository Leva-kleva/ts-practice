import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Grid, Button, Chip } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
import { sendBlank } from '../../services/sendBlank';
import { fetchAccountData } from '../../redux/ducks/authentication';
import { getRecomendations } from '../../services/recomendations';

type BasicSelectProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  values: Array<any>;
};

const BasicSelect: React.FC<BasicSelectProps> = ({
  value,
  setValue,
  label,
  values,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, mt: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Выберите автора"
          onChange={handleChange}
        >
          {values.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

interface Data {
  id: number;
  title: string;
  author: string;
  inStore: string;
  genre: string;
}

function createData(
  id: number,
  title: string,
  author: string,
  inStore: string,
  genre: string
): Data {
  return {
    id,
    title,
    author,
    inStore,
    genre,
  };
}

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
  const { accountInfo } = useSelector(
    (state: AppState) => state.authenticationReducer
  );
  const [rows, setRows] = React.useState<Array<any>>([]);
  React.useEffect(() => {
    if (accountInfo?.sent_blank) {
      const asyncHandler = async () => {
        const response = await getRecomendations();
        if (response) {
          const fetchedRows = response.data.map((item: any) =>
            createData(
              item.id,
              item.name,
              item.author,
              String(item.count),
              item.topic
            )
          );
          setRows(fetchedRows);
        }
      };

      asyncHandler();
    }
  }, [accountInfo]);
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
                        {Boolean(+row.inStore) ? (
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

type ForYouPageProps = {};

export const ForYouPage: React.FC<ForYouPageProps> = ({}) => {
  const dispatch = useDispatch();
  const { accountInfo } = useSelector(
    (state: AppState) => state.authenticationReducer
  );
  const { genres, names } = useSelector(
    (state: AppState) => state.commonReducer
  );

  const [genre, setGener] = React.useState<string>('');
  const [author, setAuthor] = React.useState<string>('');
  const handleBlankSend = async () => {
    if (genre && author) {
      const response = await sendBlank({
        genre_id: genres.find(({ name }) => name === genre)!.id,
        author_id: names.find(({ name }) => name === author)!.id,
      });
      if (response) {
        dispatch(fetchAccountData());
        dispatch(setAlertSeverity('info'));
        dispatch(setOpenAlert(true));
        dispatch(setAlertBody('Твои предпочтения отправлены!'));
        dispatch(setAlertTitle('Готовим для Вас книги...'));
      } else {
        dispatch(setAlertSeverity('error'));
        dispatch(setOpenAlert(true));
        dispatch(setAlertBody('Проблемы с сервером, попробуйте позже'));
        dispatch(setAlertTitle('Ой!'));
      }
    }
  };

  const renderForPage = React.useCallback(() => {
    console.log('accountInfo: ', accountInfo);
    if (!accountInfo?.sent_blank) {
      return (
        <>
          <Grid item xs={12} container>
            Заполните анкету и получите доступ к рекомендованным книгам
          </Grid>
          <BasicSelect
            value={genre}
            setValue={setGener}
            label="Любимая тема"
            values={genres.map(({ name }: { name: string }) => name)}
          />
          <Grid container item xs={12}></Grid>
          <BasicSelect
            value={author}
            setValue={setAuthor}
            label="Любимый автор"
            values={names.map(({ name }: { name: string }) => name)}
          />
          <Grid xs={12} item sx={{ position: 'relative' }}>
            <Button
              variant="outlined"
              sx={{ position: 'absolute', right: 0, bottom: '-60px' }}
              onClick={handleBlankSend}
            >
              Отправить
            </Button>
          </Grid>
        </>
      );
    }

    return (
      <Paper sx={{ width: '100%', p: 2 }}>
        <Grid item container xs={12}>
          <EnhancedTable />
        </Grid>
      </Paper>
    );
  }, [accountInfo]);

  return <Paper sx={{ p: 10, mt: 8, width: '100%' }}>{renderForPage()}</Paper>;
};
