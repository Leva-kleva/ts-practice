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
import { signup } from '../../../services/authentication';
import {
  checkUserEmail,
  checkUserPassword,
  getTokenFromLocalStorage,
  saveTokenToLocalStorage,
  emptyChecker,
} from '../../../utils/utils';
import { setAuthenticationState } from '../../../redux/ducks/authentication';
import Container from '@mui/material/Container';
import './Signup.scss';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorFirstname, setIsErrorFirstname] = useState(false);
  const [isErrorLastname, setIsErrorLastname] = useState(false);

  useEffect(() => {
    setIsSendingRequest(false);
  }, [errorMessage]);

  const validateInputs = () => {
    if (!checkUserEmail(email)) setIsErrorEmail(true);
    if (!checkUserPassword(password)) setIsErrorPassword(true);
    if (!firstname) setIsErrorFirstname(true);
    if (!lastname) setIsErrorLastname(true);
  };

  const onSignupClick = async () => {
    validateInputs();
    if (checkUserEmail(email) && checkUserPassword(password) && !errorMessage) {
      if (isSendingRequest === false) {
        setIsSendingRequest(true);
        const response = await signup({
          email: email,
          password: password,
          fname: firstname,
          sname: lastname,
        });
        if (response.token) {
          saveTokenToLocalStorage(response.token);
          getTokenFromLocalStorage();
          dispatch(setAuthenticationState(true));
          history.push('/');
        } else if (response.email)
          setErrorMessage(
            'Пользователь с данной электронной почтой уже зарегистрирован'
          );
        else setErrorMessage('Проблемы с сервером, попробуйте позже');
      }
    }
  };

  return (
    <div className="Signup">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={firstname}
                  error={isErrorFirstname}
                  onChange={(event) =>
                    onChangeHandler(
                      event,
                      setFirstname,
                      emptyChecker,
                      setIsErrorFirstname,
                      setErrorMessage
                    )
                  }
                  helperText={isErrorFirstname && 'Имя обязательно'}
                  id="firstName"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="lname"
                  value={lastname}
                  error={isErrorLastname}
                  onChange={(event) =>
                    onChangeHandler(
                      event,
                      setLastname,
                      emptyChecker,
                      setIsErrorLastname,
                      setErrorMessage
                    )
                  }
                  helperText={isErrorLastname && 'Фамилия обязательна'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isErrorEmail}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isErrorPassword}
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
                    (isErrorPassword &&
                      (password
                        ? 'Пароль должен содержать не менее 8-ми символов, в том числе цифры, прописные и строчные буквы'
                        : 'Пароль обязателен')) ||
                    errorMessage
                  }
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              disabled={
                !!errorMessage ||
                isErrorPassword ||
                isErrorEmail ||
                isErrorFirstname ||
                isErrorLastname
              }
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSignupClick}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">Уже есть аккаунт? Войти</Link>
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

export default SignUp;
