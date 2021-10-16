import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  setNames,
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
        genre,
        author,
      });
      if (response) {
        dispatch(fetchAccountData());
      }
    }
  };
  // const ForList = (

  // )

  return (
    <Paper sx={{ p: 10, mt: 8, width: '100%' }}>
      <Grid item xs={12} container>
        Заполните анкету
      </Grid>
      <BasicSelect
        value={genre}
        setValue={setGener}
        label="Любимая тема"
        values={genres}
      />
      <Grid container item xs={12}></Grid>
      <BasicSelect
        value={author}
        setValue={setAuthor}
        label="Любимый автор"
        values={names}
      />
      <Grid xs={6} item sx={{ position: 'relative' }}>
        <Button
          variant="outlined"
          sx={{ position: 'absolute', right: 0, bottom: 0 }}
          onClick={handleBlankSend}
        >
          Обновить личные данные
        </Button>
      </Grid>
    </Paper>
  );
};
