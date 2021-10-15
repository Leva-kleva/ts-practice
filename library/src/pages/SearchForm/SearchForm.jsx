import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { emptyChecker } from '../../utils/utils';
import { search } from '../../services/search';
import { CITIES, REGIONS, SUBSTANCES } from './SearchForm.constants';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const SearchForm = ({ history }) => {
  const classes = useStyles();
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [substance, setSubstance] = useState('');
  const [quantity, setQuantity] = useState('');
  const [product, setProduct] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorRegion, setIsErrorRegion] = useState(false);
  const [isErrorCity, setIsErrorCity] = useState(false);

  const [state, setState] = useState({
    checkedPrice: false,
    checkedSpeed: true,
  });

  const validateInputs = () => {
    if (!region) setIsErrorRegion(true);
    if (!city) setIsErrorCity(true);
  };

  useEffect(() => {
    setIsSendingRequest(false);
  }, [errorMessage]);

  const onChangeSuperHandler = (setter, validator, errorSetter, newValue) => {
    setErrorMessage('');
    if (validator(newValue)) errorSetter(false);
    setter(newValue);
  };

  const onChangeHandler = (event, setter, validator, errorSetter) => {
    setErrorMessage('');
    if (validator(event.target.value)) errorSetter(false);
    setter(event.target.value);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const getRequestBody = (substance, product) => {
    const tempObj = {
      company_region: region,
      company_town: city,
      min_order: quantity ? quantity : 0,
      price_priority: state.checkedPrice,
      distance_priority: state.checkedSpeed,
    };
    if (product && substance)
      return { ...tempObj, product: product, substance: substance };
    if (substance) return { ...tempObj, substance: substance };
    if (product) return { ...tempObj, product: product };

    return tempObj;
  };

  const onSearchClick = async () => {
    validateInputs();
    if (region && city && !errorMessage) {
      if (isSendingRequest === false) {
        setIsSendingRequest(true);
        const response = await search(getRequestBody(substance, product));
        if (response.success) history.push('/result');

        if (!response.success)
          setErrorMessage('Проблемы с сервером, попробуйте позже');
      }
    }
  };

  const onCloseHandler = (setter) => {
    setErrorMessage('');
    setter(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            SmartSupply
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Поиск
          </Typography>
          <Typography variant="h6" gutterBottom>
            Параметры поиска
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="combo-box-region"
                options={REGIONS}
                clearOnBlur
                disableCloseOnSelect
                openOnFocus
                blurOnSelect
                noOptionsText={'Убедитесь в правильности ввода'}
                onClose={() => onCloseHandler(setIsErrorRegion)}
                inputValue={region}
                onInputChange={(_, newValue) =>
                  onChangeSuperHandler(
                    setRegion,
                    emptyChecker,
                    setIsErrorRegion,
                    newValue
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Субъект"
                    variant="outlined"
                    required
                    error={isErrorRegion}
                    helperText={isErrorRegion && 'Субъект обязателен'}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="combo-box-city"
                options={CITIES}
                clearOnBlur
                disableCloseOnSelect
                openOnFocus
                blurOnSelect
                noOptionsText={'Убедитесь в правильности ввода'}
                onInputChange={(_, newValue) =>
                  onChangeSuperHandler(
                    setCity,
                    emptyChecker,
                    setIsErrorCity,
                    newValue
                  )
                }
                inputValue={city}
                onClose={() => onCloseHandler(setIsErrorCity)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Районный центр"
                    variant="outlined"
                    required
                    error={isErrorCity}
                    helperText={isErrorCity && 'Районный центр обязателен'}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="combo-box-substance"
                options={SUBSTANCES}
                clearOnBlur
                disableCloseOnSelect
                openOnFocus
                blurOnSelect
                inputValue={substance}
                noOptionsText={'Убедитесь в правильности ввода'}
                onInputChange={(_, newValue) =>
                  onChangeSuperHandler(
                    setSubstance,
                    emptyChecker,
                    () => {},
                    newValue
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Активное вещество"
                    variant="outlined"
                    helperText={errorMessage}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Необходимый объем закупки"
                type="number"
                variant="outlined"
                value={quantity}
                onChange={(event) => {
                  onChangeHandler(event, setQuantity, emptyChecker, () => {});
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Торговое название"
                variant="outlined"
                value={product}
                onChange={(event) => {
                  onChangeHandler(event, setProduct, emptyChecker, () => {});
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedPrice}
                    onChange={handleChange}
                    name="checkedPrice"
                  />
                }
                label="Приоритет по цене"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedSpeed}
                    onChange={handleChange}
                    name="checkedSpeed"
                  />
                }
                label="Приоритет по близости поставщика"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                disabled={!!errorMessage || isErrorCity || isErrorRegion}
                size="large"
                variant="contained"
                color="primary"
                onClick={onSearchClick}
              >
                Найти
              </Button>
            </Grid>
            {isSendingRequest && (
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            )}
          </Grid>
        </Paper>
      </main>
    </>
  );
};

export default withRouter(SearchForm);
