import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
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
import { ForYouPage } from './pages/ForYouPage';
import { PureAlert } from './components/PureAlert';
import {
  setGenres,
  setNames,
  setOpenAlert,
  setAlertTitle,
  setAlertBody,
  setAlertSeverity,
} from './redux/ducks/common';
import { CheckWishList } from './pages/Admin/CheckWish';
import { BindBook } from './pages/Admin/BindBook';
import { AllQuestions } from './pages/Admin/AllQuestions';
import { getGenres } from './services/getGenres';
import { getAuthors } from './services/getAuthors';
import { getAccountInfo } from './services/getAccountInfo';

const App = () => {
  const [isLoaded, setLoadedState] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authenticationReducer
  );
  const { isAlertOpen, alertBody, alertTitle, names, genres } = useSelector(
    (state: AppState) => state.commonReducer
  );
  const [open, setOpen] = useState<boolean>(true);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>(null as any);

  React.useEffect(() => {
    if (!isAuthenticated) {
      const asyncFunc = async () => {
        const response = await getAccountInfo();
        if (response) {
          history.push('/');
          dispatch(setAuthenticationState(true));
        }
        setLoadedState(true);
      };

      asyncFunc();
    }

    const asyncfunc = async () => {
      if (!names.length) {
        const response = await getAuthors();
        if (response) {
          dispatch(
            setNames(response.map(({ name }: { name: string }) => name))
          );
        } else {
          dispatch(setAlertSeverity('error'));
          dispatch(setOpenAlert(true));
          dispatch(setAlertBody('Проблемы с сервером, попробуйте позже'));
          dispatch(setAlertTitle('Ой!'));
        }
      }

      if (!genres.length) {
        const response = await getGenres();
        if (response) {
          dispatch(
            setGenres(response.map(({ name }: { name: string }) => name))
          );
        } else {
          dispatch(setAlertSeverity('error'));
          dispatch(setOpenAlert(true));
          dispatch(setAlertBody('Проблемы с сервером, попробуйте позже'));
          dispatch(setAlertTitle('Ой!'));
        }
      }
    };
    if (isAuthenticated) asyncfunc();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAlertOpen) {
      if (timerId) clearTimeout(timerId);
      const newTimerId = setTimeout(() => {
        dispatch(setOpenAlert(false));
      }, 4000);
      setTimerId(newTimerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAlertOpen, alertBody, alertTitle]);

  const renderRoutes = () => {
    const { AUTHORISET, ADMIN, root, wrongPage, signin, signup } = ROUTE_NAMES;
    const {
      dashboard,
      statistics,
      recommendedBooks,
      achievements,
      wishList,
      searchBook,
      talkToExperts,
    } = AUTHORISET;
    const { getAllQuestions, checkWish, bindBook } = ADMIN;

    const withAppTools = (Elem: JSX.Element) => (
      <AppToolsWrapper projectileProps={{ open, setOpen }}>
        {Elem}
      </AppToolsWrapper>
    );

    if (isAuthenticated) {
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
          <Route exact path={recommendedBooks}>
            {withAppTools(<ForYouPage />)}
          </Route>
          <Route exact path={checkWish}>
            {withAppTools(<CheckWishList />)}
          </Route>
          <Route exact path={bindBook}>
            {withAppTools(<BindBook />)}
          </Route>
          <Route exact path={getAllQuestions}>
            {withAppTools(<AllQuestions />)}
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

  return (
    <div className="App">
      {isLoaded ? renderRoutes() : <Loader />}
      <PureAlert />
    </div>
  );
};
export default App;
