import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Paper, Toolbar, Container } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import { AccountInfo } from './AccountInfo';
import { LastReadingBooks } from './LastReadingBooks';

type DashboardProps = {};

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  return (
    <Box component="main">
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 280,
              }}
            >
              <LastReadingBooks />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 280,
              }}
            >
              <CardMedia
                component="img"
                height="248"
                image="https://source.unsplash.com/random"
                alt="green iguana"
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Grid item xs={12} sx={{ mb: 2 }}>
                Информация о пользователе
              </Grid>
              <AccountInfo />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
