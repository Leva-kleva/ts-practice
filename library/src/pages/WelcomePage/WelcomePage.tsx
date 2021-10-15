import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './WelcomePage.scss';

const WelcomePage = () => {
  return (
    <>
      <div className="WelcomePage">
        <Header />
        <div className="WelcomePage-wrapper">
          <h1>Добро пожаловать на веб-версию умной библиотеки Ямала</h1>
          <h4>Авторизируйтесь, чтобы начать использовать</h4>
          <div style={{ marginBottom: '20px' }}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link to="/signup" className="reset-link">
                  <Button type="button" variant="contained" color="primary">
                    Зарегистрироваться
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signin" className="reset-link">
                  <Button type="button" variant="outlined" color="primary">
                    Войти
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
          {/* <h2>Более 600 поставщиков из 275 городов</h2>
          <h2>Более 3500 уникальных предложений</h2> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WelcomePage;
