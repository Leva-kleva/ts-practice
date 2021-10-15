import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  Equalizer,
  LibraryBooks,
  MenuBook,
  Message,
  ViewList,
} from '@mui/icons-material';
import { ROUTE_NAMES } from '../../constants/routeNames';

const { dashboard, statistics, achievements, search, talkToExperts } =
  ROUTE_NAMES.AUTHORISET;

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
    <ListItem button onClick={() => handleRoute(achievements)}>
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
    <ListItem button onClick={() => handleRoute(search)}>
      <ListItemIcon>
        <LibraryBooks />
      </ListItemIcon>
      <ListItemText primary="Поиск книги" />
    </ListItem>

    <ListItem button onClick={() => handleRoute(talkToExperts)}>
      <ListItemIcon>
        <Message />
      </ListItemIcon>
      <ListItemText primary="Обратная связь" />
    </ListItem>
  </div>
);
