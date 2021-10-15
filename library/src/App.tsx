import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenFromLocalStorage } from './utils/utils';
import { setAuthenticationState } from './redux/ducks/authentication';
import { ROUTE_NAMES } from './constants/routeNames';
import './App.scss';

import Signup from './pages/Authentication/Signup';
import Signin from './pages/Authentication/Signin';
import PageNotFound from './pages/PageNotFound';
import WelcomePage from './pages/WelcomePage';

import Loader from './components/Loader';
import { Dashboard } from './pages/Dashboard';
import { AppToolsWrapper } from './hocs/withAppTools/withAppTools';
import { Statistics } from './pages/Statistics';
import { Achievements } from './pages/Achievements';
import { WishList } from './pages/WishList';
import { SearchBook } from './pages/SearchBook';
import { TalkToExperts } from './pages/TalkToExperts';
import ResultPage from './pages/ResultPage';

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
        dispatch(setAuthenticationState(true));
      }
    };
    async();
    setLoadedState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const renderRoutes = () => {
    const { AUTHORISET, root, wrongPage, signin, signup } = ROUTE_NAMES;
    const {
      dashboard,
      statistics,
      resultPage,
      achievements,
      wishList,
      searchBook,
      talkToExperts,
    } = AUTHORISET;

    const withAppTools = (Elem: JSX.Element) => (
      <AppToolsWrapper projectileProps={{ open, setOpen }}>
        {Elem}
      </AppToolsWrapper>
    );

    if (!isAuthenticated) {
      return (
        <Switch>
          <Route exact path={dashboard}>
            {withAppTools(<Dashboard />)}
          </Route>
          <Route exact path={statistics}>
            {withAppTools(<Statistics />)}
          </Route>
          <Route exact path={achievements}>
            {withAppTools(<Achievements />)}
          </Route>
          <Route exact path={wishList}>
            {withAppTools(<WishList />)}
          </Route>
          <Route exact path={searchBook}>
            {withAppTools(<SearchBook />)}
          </Route>
          <Route exact path={talkToExperts}>
            {withAppTools(<TalkToExperts />)}
          </Route>
          <Route exact path={resultPage}>
            {withAppTools(<ResultPage />)}
          </Route>
          <Route path={wrongPage} component={PageNotFound} />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route exact path={root} component={WelcomePage} />
        <Route path={signin} component={Signin} />
        <Route path={signup} component={Signup} />
        <Route path={wrongPage} component={PageNotFound} />
      </Switch>
    );
  };

  return <div className="App">{isLoaded ? renderRoutes() : <Loader />}</div>;
};
export default App;
