import { Mail } from '@mui/icons-material';
import { Grid, Typography, Paper, Button, TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { onChangeHandler } from '../Authentication/authentication.utils';
import InputMask from 'react-input-mask';
import { checkUserEmail, checkUserName, emptyChecker } from '../../utils/utils';
import {
  setAlertBody,
  setAlertSeverity,
  setAlertTitle,
  setOpenAlert,
} from '../../redux/ducks/common';
import { sendMessage } from '../../services/sendMessage';
import { useHistory } from 'react-router';

type TalkToExpertsProps = {};

export const TalkToExperts: React.FC<TalkToExpertsProps> = ({}) => {
  const voidFunc = () => {};
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChange = onChangeHandler;
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const handleSendMessage = async () => {
    if (!emptyChecker(name)) {
      setErrorMessage('Введите ФИО');
    }
    if (!emptyChecker(email)) {
      setErrorMessage('Введите электронный адрес');
    }
    if (!emptyChecker(title)) {
      setErrorMessage('Введите тему письма');
    }
    if (!emptyChecker(phone)) {
      setErrorMessage('Введите Ваш номер телефона');
    }
    if (!emptyChecker(message)) {
      setErrorMessage('Введите Ваш вопрос');
    }
    if (
      !errorMessage &&
      name.trim() &&
      email.trim() &&
      phone &&
      title.trim() &&
      message.trim()
    ) {
      const response = await sendMessage({
        name,
        phone,
        email,
        header: title,
        message,
      });

      if (response) {
        dispatch(setAlertSeverity('success'));
        dispatch(setOpenAlert(true));
        dispatch(setAlertBody('Письмо отправлено'));
        dispatch(setAlertTitle('Получилось!'));
        history.push('/');
      } else {
        setErrorMessage('Проблемы с сервером, попробуйте позже');
      }
    }
  };
  return (
    <Grid container xs={12} sx={{ mt: 8, height: '100vh' }}>
      <Grid
        item
        xs={4}
        sx={{
          p: 5,
          mt: 12,
        }}
      >
        <Box sx={{ display: 'flex', mb: 3 }}>
          <Mail sx={{ mb: 2, mr: 1 }} />
          Свяжитесь с библиотекарем
        </Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Поговорите с нашим экспертом
        </Typography>
        <Typography variant="h5" color="secondary">
          Есть какие-то вопросы?
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Paper sx={{ p: 5, height: '100vh' }}>
          <Typography variant="h5" sx={{ mt: 3, mb: 5 }}>
            Заполните форму
          </Typography>
          <Grid container spacing={3}>
            <Grid xs={12} item>
              <TextField
                label="ФИО"
                placeholder="Введите ФИО"
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
          </Grid>
          <Grid container spacing={3}>
            <Grid xs={12} item>
              <TextField
                label="Email"
                value={email}
                error={!!errorMessage && !email}
                placeholder="Введите электронный адрес"
                variant="outlined"
                fullWidth
                onChange={(event) =>
                  handleChange(
                    event,
                    setEmail,
                    checkUserEmail,
                    voidFunc,
                    setErrorMessage
                  )
                }
              />
            </Grid>

            <Grid xs={12} item>
              <InputMask
                mask="+7 (999) 999 99 99"
                value={phone}
                disabled={false}
                maskChar=" "
                onChange={(event) =>
                  handleChange(
                    event,
                    setPhone,
                    voidFunc,
                    voidFunc,
                    setErrorMessage
                  )
                }
              >
                {() => (
                  <TextField
                    label="Телефон"
                    placeholder="+7 (***) ***-**-**"
                    variant="outlined"
                    fullWidth
                  />
                )}
              </InputMask>
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="Тема"
                value={title}
                error={!!errorMessage && !title}
                placeholder="Введите тему письма"
                variant="outlined"
                fullWidth
                onChange={(event) =>
                  handleChange(
                    event,
                    setTitle,
                    emptyChecker,
                    voidFunc,
                    setErrorMessage
                  )
                }
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                placeholder="Введите ваш вопрос"
                multiline
                label="Вопрос"
                value={message}
                onChange={(event) =>
                  handleChange(
                    event,
                    setMessage,
                    emptyChecker,
                    voidFunc,
                    setErrorMessage
                  )
                }
                rows={4}
                fullWidth
                maxRows={8}
              />
            </Grid>

            <Grid xs={12} item sx={{ position: 'relative' }}>
              <Grid item sx={{ color: 'rgb(255, 0, 0)' }}>
                {errorMessage}
              </Grid>
              <Button
                variant="outlined"
                sx={{ position: 'absolute', right: 0, bottom: '-40px' }}
                onClick={handleSendMessage}
              >
                Отправить вопрос эксперту
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
