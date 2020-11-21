import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import * as React from 'react';
import { StockTimeSeriesChartContainer } from '../../middle-level/time-series-chart/stock-time-series-chart.component';
import { NewsSectionContainer } from '../../middle-level/news/news-section.component';
import styles from './info-page.styles';
const InfoPage = (): React.ReactElement => {
  const cardStyles = styles.useCardStyles();
  return (
    <Grid direction="row" container={true}>
      <Grid item={true} xs={8}>
        <Card classes={cardStyles}>
          <CardHeader title="MSFT Stock" />
          <CardContent>
            <StockTimeSeriesChartContainer />
          </CardContent>
        </Card>
      </Grid>
      <Grid item={true} xs={4}>
        <Card classes={cardStyles}>
          <CardHeader title="MSFT Stock" />
          <CardContent>
            <NewsSectionContainer />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export { InfoPage };