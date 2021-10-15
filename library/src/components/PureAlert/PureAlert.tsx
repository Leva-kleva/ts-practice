import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import './PureAlert.scss';

import { setOpenAlert } from '../../redux/ducks/common';
import { Alert, AlertTitle } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'absolute',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

type PureAlertProps = {
  title?: string;
};

export const PureAlert: React.FC<PureAlertProps> = ({ title }) => {
  const dispatch = useDispatch();
  const { alertSeverity, alertBody, isAlertOpen } = useSelector(
    (state: AppState) => state.commonReducer
  );
  const classes = useStyles();
  return isAlertOpen ? (
    <div className={classes.root}>
      <Alert
        severity={alertSeverity}
        onClose={() => dispatch(setOpenAlert(false))}
        variant="filled"
        classes={{ root: 'PureAlert-root' }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {alertBody}
      </Alert>
    </div>
  ) : null;
};
