import { Doughnut } from 'react-chartjs-2';
import Typography from '@mui/material/Typography';

import { Bar } from 'react-chartjs-2';
import { colors } from '@material-ui/core';
import { Paper, Grid } from '@mui/material';

export const Statistics = (props: any) => {
  const data1 = {
    datasets: [
      {
        data: [30, 10, 15, 33, 1, 3, 4, 3],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.teal[500],
          colors.pink[600],
          colors.green[600],
          colors.purple[500],
        ],
      },
    ],
    labels: [
      'Пушкин A.С.',
      'Серова М.С.',
      'Донцова Д.А.',
      'Леонов Н.И.',
      'Никитин Ю.А.',
      'Абдуллаев Ч.А.',
      'Калинина Д.А.',
      'Полякова Т.В.',
    ],
  };

  const options2 = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {},
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          },
        },
      ],
    },
    tooltips: {
      borderWidth: 1,
      enabled: true,
      intersect: false,
      mode: 'index',
    },
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      borderWidth: 0.5,
      enabled: true,
      intersect: false,
      mode: 'index',
    },
  };
  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[200],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [4, 4, 1, 1, 3, 8],
        label: 'Количество прочитанных книг',
        maxBarThickness: 10,
      },
    ],
    labels: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь'],
  };

  return (
    <Paper
      sx={{
        width: '100%',
        maxHeight: '100vh',
        p: 3,
        mt: 8,
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h5" color="secondary">
            Количество прочитанных книг
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h5" color="secondary">
            Любимые авторы
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid
          item
          xs={6}
          sx={{
            height: '400px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            p: 5,
          }}
        >
          {/* @ts-ignore */}
          <Bar data={data} options={options2} />
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            height: '400px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            p: 5,
          }}
        >
          {/* @ts-ignore */}
          <Doughnut data={data1} options={options} />
        </Grid>
      </Grid>
    </Paper>
  );
};
