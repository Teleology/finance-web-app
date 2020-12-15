import { Card, Grid } from '@material-ui/core';
import * as React from 'react';
import { StockTimeSeriesChartContainer } from '../../container/stock-time-series-chart/stock-time-series-chart.component';
import { CompanyNewsContainer } from '../../container/company-news/company-news.component';
import { useCardContainerStyles, useCardStyles, useFullFlexStyles } from '../../common-styles';

const InfoPage = (): React.ReactElement => {
  const cardStyles = useCardStyles();
  const fullFlexStyles = useFullFlexStyles(),
    cardContainerStyles = useCardContainerStyles();
  return (
    <Grid direction="row" container={true} classes={fullFlexStyles}>
      <Grid item={true} xs={8} classes={cardContainerStyles}>
        <Card classes={cardStyles}>
          <StockTimeSeriesChartContainer />
        </Card>
      </Grid>
      <Grid item={true} xs={4} classes={cardContainerStyles}>
        <Card classes={cardStyles}>
          <CompanyNewsContainer />
        </Card>
      </Grid>
    </Grid>
  );
};

export { InfoPage };
