import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenFromLocalStorage } from './utils/utils';
import { setAuthenticationState } from './redux/ducks/authentication';

import { Loader } from './components/Loader';
import { Editor } from './pages/Editor';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard/Dashboard';
import { Preview } from './pages/Preview';

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
      dispatch(setAuthenticationState(true));
    }
    setLoadedState(true);
  }, []);

  const renderRoutes = () => {
    if (isAuthenticated) {
      return (
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/edit/:id/:id" component={Editor} />
          <Route exact path="/preview/" component={Preview} />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route exact path="/" component={Signin} />
      </Switch>
    );
  };

  return <div className="App">{isLoaded ? renderRoutes() : <Loader />}</div>;
};
export default App;
