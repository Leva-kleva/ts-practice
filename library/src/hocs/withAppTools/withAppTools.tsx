import React from 'react';
import Box from '@mui/material/Box';
import { AppHeader } from '../../components/AppHeader';
import { Sidebar } from '../../components/Sidebar';

type withAppToolsProps = {
  projectileProps: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export const AppToolsWrapper: React.FC<withAppToolsProps> = ({
  projectileProps,
  children,
}) => {
  const { open, setOpen } = projectileProps;
  return (
    <Box sx={{ display: 'flex' }}>
      <AppHeader open={open} setOpen={setOpen} />

      <Sidebar open={open} setOpen={setOpen} />
      {children}
    </Box>
  );
};
