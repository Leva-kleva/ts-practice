import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid, Paper } from '@mui/material/';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import './Achievements.scss';

function MediaCard({ title, image, descs }: any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://source.unsplash.com/${image}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          color="text.primary"
        >
          {title}
        </Typography>
        {/* @ts-ignore */}
        <MobileStepper
          sx={{ position: 'relative' }}
          variant="progress"
          steps={12}
          position="static"
          activeStep={Math.floor(Math.random() * 12)}
        />
      </CardContent>
    </Card>
  );
}

const images = ['9DaOYUYnOls', 'YLSwjSy7stw', 'xrbbXIXAWY0', '9ROY8fXmTto'];

const descs = ['что-то', 'что-то', 'что-то', 'что-то'];

const titles = [
  'Прочесть 15000 страниц',
  'Прочесть 50 книг',
  'Посетить библиотеку 100 раз',
  'Накопил 10000 бонусов',
];

type AchievementsProps = {};

export const Achievements: React.FC<AchievementsProps> = ({}) => {
  return (
    <Paper sx={{ width: '100%', mt: 8, p: 10, backgroundColor: '#FFFF' }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={6} sx={{ mb: 5 }}>
          <MediaCard image={images[0]} descs={descs[0]} title={titles[0]} />
        </Grid>
        <Grid item xs={6}>
          <MediaCard image={images[1]} descs={descs[1]} title={titles[1]} />
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item xs={6}>
            <MediaCard image={images[2]} descs={descs[2]} title={titles[2]} />
          </Grid>
          <Grid item xs={6}>
            <MediaCard image={images[3]} descs={descs[3]} title={titles[3]} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
