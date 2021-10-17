import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid, Paper } from '@mui/material/';
import MobileStepper from '@mui/material/MobileStepper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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

const createData = (
  id: number,
  rating: number,
  place: number,
  percentage: number
) => ({
  id,
  rating,
  place,
  percentage,
});

function BasicTable({ rows }: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Идентификатор</TableCell>
            <TableCell align="right">Рейтинг</TableCell>
            <TableCell align="right">Место</TableCell>
            <TableCell align="right">Процент среди читателей</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                  backgroundColor: '#3a3ecd',
                },
              }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.rating}</TableCell>
              <TableCell align="right">{row.place}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{`${row.percentage}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const Achievements: React.FC<AchievementsProps> = ({}) => {
  const rows = [
    createData(9936, 50243, 1, 1),
    createData(6825, 40244, 2, 1),
    createData(4142, 35003, 3, 1),
    createData(6476, 29290, 4, 1),
    createData(8116, 28032, 5, 1),
    createData(106, 13346, 600, 5),
  ];
  return (
    <Paper
      sx={{
        width: '100%',
        mt: 8,
        p: 10,
        backgroundColor: '#FFFF',
        maxHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <Grid container>
        <Grid item xs={6} sx={{ mb: 5 }}>
          <MediaCard image={images[0]} descs={descs[0]} title={titles[0]} />
        </Grid>
        <Grid item xs={6}>
          <MediaCard image={images[1]} descs={descs[1]} title={titles[1]} />
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <MediaCard image={images[2]} descs={descs[2]} title={titles[2]} />
          </Grid>
          <Grid item xs={6}>
            <MediaCard image={images[3]} descs={descs[3]} title={titles[3]} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mb: 3, mt: 3, color: '#3ae6ca' }}>
        <Typography>Топ лучших читателей</Typography>
      </Grid>
      <Grid container xs={12}>
        <BasicTable rows={rows} />
      </Grid>
    </Paper>
  );
};
