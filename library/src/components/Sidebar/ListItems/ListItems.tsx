import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Divider from '@mui/material/Divider';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import LinkIcon from '@mui/icons-material/Link';
import {
  Equalizer,
  LibraryBooks,
  MenuBook,
  Message,
  Recommend,
  ViewList,
} from '@mui/icons-material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { ROUTE_NAMES } from '../../../constants/routeNames';

const {
  dashboard,
  statistics,
  achievements,
  searchBook,
  talkToExperts,
  wishList,
  recommendedBooks,
} = ROUTE_NAMES.AUTHORISET;

const { bindBook, checkWish, getAllQuestions } = ROUTE_NAMES.ADMIN;

export const mainListItems = (handleRoute: (pathname: string) => void) => (
  <div>
    <ListItem button onClick={() => handleRoute(dashboard)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Аккаунт" />
    </ListItem>
    <ListItem button onClick={() => handleRoute(statistics)}>
      <ListItemIcon>
        <Equalizer />
      </ListItemIcon>
      <ListItemText primary="Статистика" />
    </ListItem>
    <ListItem button onClick={() => handleRoute(achievements)}>
      <ListItemIcon>
        <MenuBook />
      </ListItemIcon>
      <ListItemText primary="Достижения" />
    </ListItem>
    <ListItem button onClick={() => handleRoute(wishList)}>
      <ListItemIcon>
        <ViewList />
      </ListItemIcon>
      <ListItemText primary="Wish-лист" />
    </ListItem>
  </div>
);

export const secondaryListItems = (handleRoute: (pathname: string) => void) => (
  <div>
    <ListSubheader inset>Сервисы</ListSubheader>
    <ListItem button onClick={() => handleRoute(searchBook)}>
      <ListItemIcon>
        <LibraryBooks />
      </ListItemIcon>
      <ListItemText primary="Поиск книги" />
    </ListItem>

    <ListItem button onClick={() => handleRoute(recommendedBooks)}>
      <ListItemIcon>
        <Recommend />
      </ListItemIcon>
      <ListItemText primary="Для Вас" />
    </ListItem>

    <ListItem button onClick={() => handleRoute(talkToExperts)}>
      <ListItemIcon>
        <Message />
      </ListItemIcon>
      <ListItemText primary="Обратная связь" />
    </ListItem>
  </div>
);

export const adminListItems = (handleRoute: (pathname: string) => void) => (
  <div>
    <ListSubheader inset>Библиотекарю</ListSubheader>
    <ListItem button onClick={() => handleRoute(bindBook)}>
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText primary="Прикрепить книгу" />
    </ListItem>

    <ListItem button onClick={() => handleRoute(checkWish)}>
      <ListItemIcon>
        <PlaylistAddCheckIcon />
      </ListItemIcon>
      <ListItemText primary="Необходимые книги" />
    </ListItem>

    <ListItem button onClick={() => handleRoute(getAllQuestions)}>
      <ListItemIcon>
        <LiveHelpIcon />
      </ListItemIcon>
      <ListItemText primary="Вопросы" />
    </ListItem>
    <Divider />
  </div>
);
