import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenFromLocalStorage } from './utils/utils';
// import checkToken from './services/checkToken';
import { setAuthenticationState } from './redux/ducks/authentication';
import { ROUTE_NAMES } from './constants/routeNames';
import './App.scss';

import Signup from './pages/Authentication/Signup';
import Signin from './pages/Authentication/Signin';
import PageNotFound from './pages/PageNotFound';
import WelcomePage from './pages/WelcomePage';
// import ResultPage from './pages/ResultPage';
// import SearchForm from './pages/SearchForm';

import Loader from './components/Loader';
import { Dashboard } from './pages/Dashboard';
import { AppHeader } from './components/AppHeader';
import { Sidebar } from './components/Sidebar';

const App = () => {
  const [isLoaded, setLoadedState] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authenticationReducer
  );
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    const async = async () => {
      getTokenFromLocalStorage();
      if (window.token && !isAuthenticated) {
        // const result = await checkToken();
        // if (result.detail !== 'Invalid token.')
        dispatch(setAuthenticationState(true));
      }
    };
    async();
    setLoadedState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const renderRoutes = () => {
    const { AUTHORISET, root, wrongPage } = ROUTE_NAMES;
    const { resultPage, dashboard } = AUTHORISET;

    if (!isAuthenticated) {
      return (
        <Switch>
          <Box sx={{ display: 'flex' }}>
            <AppHeader open={open} setOpen={setOpen} />

            <Sidebar open={open} setOpen={setOpen} />

            {/* <Route exact path={resultPage} component={ResultPage} />
          <Route exact path={newSearch} component={SearchForm} /> */}
            <Route exact path={dashboard} component={Dashboard} />
          </Box>
          <Route path={wrongPage} component={PageNotFound} />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route exact path={root} component={WelcomePage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path={wrongPage} component={PageNotFound} />
      </Switch>
    );
  };

  return <div className="App">{isLoaded ? renderRoutes() : <Loader />}</div>;
};
export default App;
