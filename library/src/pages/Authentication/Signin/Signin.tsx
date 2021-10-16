import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import { signin } from '../../../services/authentication';
import { checkUserEmail, checkUserPassword } from '../../../utils/utils';
import { setAuthenticationState } from '../../../redux/ducks/authentication';
import './Signin.scss';
import { onChangeHandler } from '../authentication.utils';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  useEffect(() => {
    setIsSendingRequest(false);
  }, [errorMessage]);

  const validateInputs = () => {
    if (!checkUserEmail(email)) setIsErrorEmail(true);
    if (!password) setIsErrorPassword(true);
  };

  const onSigninClick = async () => {
    validateInputs();
    if (checkUserEmail(email) && password && !errorMessage) {
      if (isSendingRequest === false) {
        setIsSendingRequest(true);
        const response = await signin({
          email: email,
          password: password,
        });
        if (response?.info) {
          history.push('/');
          dispatch(setAuthenticationState(true));
        } else {
          setErrorMessage('Пользователь не существует');
        }
        if (!response) setErrorMessage('Проблемы с сервером, попробуйте позже');
      }
    }
  };

  return (
    <div className="Signin">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={
                isErrorEmail ||
                (!!errorMessage &&
                  errorMessage !== 'Проблемы с сервером, попробуйте позже')
              }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронный адрес"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) =>
                onChangeHandler(
                  event,
                  setEmail,
                  checkUserEmail,
                  setIsErrorEmail,
                  setErrorMessage
                )
              }
              helperText={
                isErrorEmail &&
                (email
                  ? 'Проверьте правильность ввода электронного адреса'
                  : 'Электронный адрес обязателен')
              }
              autoFocus
            />
            <TextField
              error={
                isErrorPassword ||
                (!!errorMessage &&
                  errorMessage !== 'Проблемы с сервером, попробуйте позже')
              }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              value={password}
              onChange={(event) =>
                onChangeHandler(
                  event,
                  setPassword,
                  checkUserPassword,
                  setIsErrorPassword,
                  setErrorMessage
                )
              }
              helperText={
                (isErrorPassword && 'Пароль обязателен') || errorMessage
              }
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disabled={!!errorMessage || isErrorEmail || isErrorPassword}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSigninClick}
            >
              Войти
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup">Нет аккаунта? Зарегистрироваться</Link>
              </Grid>
            </Grid>
            {isSendingRequest && (
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Signin;
