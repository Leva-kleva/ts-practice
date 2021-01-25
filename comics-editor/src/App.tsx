import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenFromLocalStorage } from './utils/utils';
// import checkToken from './services/checkToken';
import { setAuthenticationState } from './redux/ducks/authentication';
// import { ROUTE_NAMES } from './constants/routeNames';
// import './App.scss';

import Signin from './pages/Signin';

import Loader from './components/Loader';

const App = () => {
  const [isLoaded, setLoadedState] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state: any) => state.authenticationReducer
  );

  //@ts-ignore
  useEffect(async () => {
    getTokenFromLocalStorage();
    if (window.token && !isAuthenticated) {
      // const result = await checkToken();
      // if (result.detail !== 'Invalid token.')
      dispatch(setAuthenticationState(true));
    }
    setLoadedState(true);
  }, []);

  const renderRoutes = () => {
    // const { AUTHORISET, root, wrongPage } = ROUTE_NAMES;
    // const { resultPage, newSearch } = AUTHORISET;

    if (isAuthenticated) {
      return (
        <Switch>
          <h1>Авторизировались</h1>
          {/* <Route exact path={resultPage} component={ResultPage} />
          <Route exact path={newSearch} component={SearchForm} />
          <Route path={wrongPage} component={PageNotFound} /> */}
        </Switch>
      );
    }
    return (
      <Switch>
        <Route path="/" component={Signin} />
      </Switch>
    );
  };

  return <div className="App">{isLoaded ? renderRoutes() : <Loader />}</div>;
};
export default App;
