import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { results } from '../../services/results';
import CustomTable from './Table';
import './ResultPage.scss';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loader from '../../components/Loader';
import Footer from '../../components/Footer';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Album = () => {
  const [expandedFirst, setExpandedFirst] = React.useState(false);
  const [expandedSecond, setExpandedSecond] = React.useState(false);
  const [expandedThird, setExpandedThird] = React.useState(false);
  const [data, setData] = React.useState(null);

  const handleExpandClick = (setter, value) => () => setter(!value);

  const getValue = (idx) => {
    if (idx === 0) return expandedFirst;
    if (idx === 1) return expandedSecond;
    if (idx === 2) return expandedThird;
  };

  const getSetter = (idx) => {
    if (idx === 0) return setExpandedFirst;
    if (idx === 1) return setExpandedSecond;
    if (idx === 2) return setExpandedThird;
  };

  useEffect(async () => {
    if (!data) {
      const response = await results();
      setData(response.data);
    }
  }, []);

  const mapState = {
    center: [55.754734, 37.583314],
    zoom: 2,
  };

  const [state, setState] = useState({
    template: null,
  });

  const createTemplateLayoutFactory = (ymaps) => {
    if (ymaps && !state.template) {
      setState({
        template: ymaps.templateLayoutFactory.createClass(
          '<div class="bb">' +
            '<span class="bb-num-org">' +
            '</span>xzcxzcddfaa<span class="bb-name">' +
            '</span></div>'
        ),
      });
    }
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <NotListedLocationIcon className={classes.icon} />
          <div style={{ marginRight: '8px' }}>
            <Link to="/" className="reset-link">
              <Button size="small" color="secondary" variant="contained">
                Новый поиск
              </Button>
            </Link>
          </div>
          <Typography variant="h6" color="inherit" noWrap>
            Результаты поиска
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Лучшие поставщики по рейтингу SmartSupply
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {!data && (
              <Grid container justify="center">
                <Loader />
              </Grid>
            )}
            <Grid container justify="flex-end">
              {data && 'Данные актуальны на 13.12.2020'}
            </Grid>
            {data &&
              [...data].slice(0, 3).map((card, idx) => {
                const setter = getSetter(idx);
                const value = getValue(idx);
                return (
                  <Grid
                    item
                    key={`${card.name_product}_${idx}`}
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={
                          card.product_image === 'nan' || !card.product_image
                            ? require('./assets/fertilizer-2.svg').default
                            : card.product_image
                        }
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.name_product}
                        </Typography>
                        <div>
                          <Typography>
                            {card.price === 'nan'
                              ? 'Цена  по запросу'
                              : 'Цена: ' + card.price + ' ₽'}
                          </Typography>
                          <Typography>
                            {'Расстояние до поставщика: ' +
                              Math.floor(card.distance * 1000) /
                                (1000)
                                  .toFixed(2)
                                  .substr(0, 4)
                                  .replace(/\.$/, '') +
                              ' км'}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" disabled>
                          Подробнее
                        </Button>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: value,
                          })}
                          onClick={handleExpandClick(setter, value)}
                          aria-expanded={value}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </CardActions>
                      <Collapse in={value} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography
                            paragraph
                          >{`Поставщик: ${card.company_name}`}</Typography>
                          <Typography
                            paragraph
                          >{`Субъект: ${card.company_region}`}</Typography>
                          <Typography>
                            {card.product_text && card.product_text !== 'nan'}
                          </Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            href={card.product_link}
                            target="_blank"
                          >
                            Перейти на сайт поставщика
                          </Button>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {data && data.length
            ? `Все предложения (${data.length})`
            : 'Все предложения'}
        </Typography>
        <div style={{ marginBottom: '50px', padding: '5px' }}>
          <CustomTable data={data} />
        </div>
        <Typography variant="h5" align="center" color="textPrimary" paragraph>
          Карта поставщиков
        </Typography>
        {!data && (
          <Grid container justify="center">
            <Loader />
          </Grid>
        )}
        {
          <YMaps>
            <Map
              width={'100%'}
              height={'400px'}
              state={mapState}
              onLoad={createTemplateLayoutFactory}
              modules={['templateLayoutFactory', 'layout.ImageWithContent']}
            >
              {data &&
                data.map((row, i) => {
                  return (
                    <Placemark
                      geometry={[
                        Number(row.coordinates[0]),
                        Number(row.coordinates[1]),
                      ]}
                      properties={{
                        hintContent: `${
                          row.company_name && row.company_name !== 'nan'
                            ? row.company_name
                            : 'Частное лицо'
                        } (подробнее...)`,
                        balloonContent: `
                      <p>Товар: ${row.name_product}</p>
                      <p>Цена: ${
                        row.price && row.price !== 'nan'
                          ? row.price + '₽'
                          : 'По запросу'
                      }</p>
                      <p>Поставщик: ${
                        row.company_name && row.company_name !== 'nan'
                          ? row.company_name
                          : 'По запросу'
                      }</p>
                      <p>Субъект: ${row.company_region}</p>
                      <p>${
                        row.product_text && row.product_text !== 'nan'
                          ? row.product_text
                          : ''
                      }</p>
                      <a href="${
                        row.product_link
                      }" target="_blank">перейти на сайт поставщика</a>
                      `,
                      }}
                      modules={[
                        'geoObject.addon.balloon',
                        'geoObject.addon.hint',
                      ]}
                      options={{
                        iconLayout: 'default#image',
                        iconImageHref: '/images/fertilizer-3.svg',
                        // Размеры метки.
                        iconImageSize: [30, 42],
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: [-5, -38],
                      }}
                    />
                  );
                })}
            </Map>
          </YMaps>
        }
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Album;
