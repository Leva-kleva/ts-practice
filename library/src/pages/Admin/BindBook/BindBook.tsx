import {
  Paper,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent,
  CardMedia,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
  setAlertBody,
  setAlertSeverity,
  setAlertTitle,
  setOpenAlert,
} from '../../../redux/ducks/common';
import { bindBookWithUser } from '../../../services/bindUser';
import { getUserInfo } from '../../../services/getUserInfo';
import { emptyChecker } from '../../../utils/utils';
import { onChangeHandler } from '../../Authentication/authentication.utils';

type BindBookProps = {};

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

function createData(key: string, value: string) {
  return { key, value };
}

export default function BasicTable({ rows }: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Личные данные пользователя</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const BindBook: React.FC<BindBookProps> = ({}) => {
  const { names } = useSelector((state: AppState) => state.commonReducer);
  const [author, setAuthor] = React.useState<string>('');
  const handleChange = onChangeHandler;
  const location = useLocation();
  const [user, setUser] = React.useState<any>('');
  const history = useHistory();
  const [userId, setUserId] = React.useState<string>('');
  React.useEffect(() => {
    const [, value] = location.search.slice(1).split('=');
    setUserId(value);
    const asyncFunc = async () => {
      const response = await getUserInfo(+value);
      setUser(response);
    };
    asyncFunc();
  }, []);
  const dispatch = useDispatch();
  const rows = [
    createData('ФИО', `${user.fname} ${user.sname}`),
    createData('Телефон', user.phone ?? 'не указан'),
    createData('Адрес', user.address ?? 'не указан'),
    createData('email', user.email),
  ];

  const [name, setName] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const voidFunc = () => {};
  const handleLinkBook = async () => {
    const response = await bindBookWithUser({
      author,
      name,
      userId,
    });
    if (response) {
      history.push('/');
      dispatch(setAlertSeverity('success'));
      dispatch(setOpenAlert(true));
      dispatch(setAlertBody('Книжка привязана к читательскому билету'));
      dispatch(setAlertTitle('Получилось!'));
    } else {
      dispatch(setAlertSeverity('error'));
      dispatch(setOpenAlert(true));
      dispatch(setAlertBody('Произошла ошибка, попробуйте позже'));
      dispatch(setAlertTitle('Ой!'));
    }
  };
  return (
    <Paper sx={{ p: 10, mt: 8, width: '100%' }}>
      <Grid item xs={12} container>
        Для закрепления книги к читательскому билету выберите автора книги и
        введите название книги
      </Grid>

      <Grid container item xs={12}></Grid>
      <BasicSelect
        value={author}
        setValue={setAuthor}
        label="Автор"
        values={names}
      />

      <Grid xs={12} item spacing={3}>
        <TextField
          label="Название книги"
          placeholder="Введите название книги"
          variant="outlined"
          fullWidth
          value={name}
          error={!!errorMessage && !name}
          onChange={(event) =>
            handleChange(
              event,
              setName,
              emptyChecker,
              voidFunc,
              setErrorMessage
            )
          }
          sx={{ marginBottom: '20px', mt: 3 }}
        />
      </Grid>
      <Grid xs={12} item sx={{ position: 'relative' }}>
        <Button
          variant="outlined"
          sx={{ position: 'absolute', right: 0, bottom: '-60px' }}
          onClick={handleLinkBook}
        >
          Прикрепить
        </Button>
      </Grid>
      <Grid container xs={12} justifyContent="space-between">
        <Grid xs={8} item sx={{ mt: 10 }}>
          <BasicTable rows={rows} />
        </Grid>
        <Grid xs={4} item>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 280,
              mt: 8,
            }}
          >
            <CardMedia
              component="img"
              height="248"
              image="https://source.unsplash.com/NoRsyXmHGpI"
              alt="green iguana"
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
