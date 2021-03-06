import React from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { IconButton, Toolbar, Divider, List } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import MuiDrawer from '@mui/material/Drawer';
import { mainListItems, secondaryListItems } from './ListItems';
import { drawerWidth } from '../AppHeader/AppHeader';
import { adminListItems } from './ListItems/ListItems';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAccountData } from '../../redux/ducks/authentication';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

type SidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAccountData());
  }, []);
  const { accountInfo } = useSelector(
    (state: AppState) => state.authenticationReducer
  );
  const toggleDrawer = () => setOpen((open) => !open);
  const handleRoute = (pathname: string) => history.push(pathname);
  const isAdmin = accountInfo.role || false;
  // const isAdmin = true;
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>{mainListItems(handleRoute)}</List>
      <Divider />
      <List>{isAdmin && adminListItems(handleRoute)}</List>
      <List>{secondaryListItems(handleRoute)}</List>
    </Drawer>
  );
};
