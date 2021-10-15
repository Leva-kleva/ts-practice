import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { onChangeHandler } from '../../Authentication/authentication.utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { checkUserName, emptyChecker } from '../../../utils/utils';
import { addBookToWishList } from '../../../services/addBookToWishList';
import { useDispatch } from 'react-redux';
import { fetchAccountData } from '../../../redux/ducks/authentication';
import {
  setAlertBody,
  setAlertSeverity,
  setAlertTitle,
  setOpenAlert,
} from '../../../redux/ducks/common';

type AddBookToWishListProps = {};

export const AddBookToWishList: React.FC<AddBookToWishListProps> = ({}) => {
  const dispatch = useDispatch();
  const handleChange = onChangeHandler;
  const [name, setName] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const voidFunc = () => {};
  const handleUpdateAccountInfo = async () => {
    if (!emptyChecker(name)) {
      setErrorMessage('Введите название книги');
    }
    if (!emptyChecker(author)) {
      setErrorMessage('Введите автора');
    }
    if (!errorMessage && name.trim() && author.trim()) {
      const response = await addBookToWishList({
        name,
        author,
      });
      if (response) {
        dispatch(fetchAccountData());
        dispatch(setAlertSeverity('success'));
        dispatch(setOpenAlert(true));
        dispatch(setAlertBody(`Книга ${name} была успешно добавлена`));
        dispatch(setAlertTitle('Получилось!'));
      } else {
        setErrorMessage('Проблемы с сервером, попробуйте позже');
      }
    }
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid xs={12} item>
          Добавить книгу в wish-лист
        </Grid>
        <Grid xs={6} item>
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
                checkUserName,
                voidFunc,
                setErrorMessage
              )
            }
            sx={{ marginBottom: '20px' }}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            label="Автор"
            placeholder="Введите автора"
            variant="outlined"
            fullWidth
            value={author}
            error={!!errorMessage && !author}
            onChange={(event) =>
              handleChange(
                event,
                setAuthor,
                checkUserName,
                voidFunc,
                setErrorMessage
              )
            }
            sx={{ marginBottom: '20px' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ position: 'relative' }}>
        <Grid xs={6} item>
          <Grid item sx={{ color: 'rgb(255, 0, 0)' }}>
            {errorMessage}
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          onClick={handleUpdateAccountInfo}
          sx={{ position: 'absolute', right: 0, bottom: '-40px' }}
        >
          Добавить
        </Button>
      </Grid>
    </Box>
  );
};
