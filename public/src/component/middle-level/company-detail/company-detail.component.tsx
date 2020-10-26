import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';
import { RootState } from '../../../service/root-store';
import styles from './company-detail.styles';
const mapState = ({ companyInfo }: RootState) =>
  ({
    detail: companyInfo.detail
  } as const);

type Props = ReturnType<typeof mapState>;

const CompanyDetail = (props: Props): React.ReactElement => {
  const { useCardStyles } = styles;
  // TODO use branch
  const { name, symbol, exchange, industry } = props.detail!!!;
  return (
    <Card classes={useCardStyles()}>
      <CardHeader title={symbol} subheader={name} titleTypographyProps={{ variant: 'h3' }} subheaderTypographyProps={{ variant: 'h5' }} />
      <Divider />
      <CardContent>
        <Grid container={true} spacing={2} direction="column">
          <Grid container={true} item={true} justify="space-between">
            <Grid item={true}>
              <Typography variant="subtitle1">Stock Symbol</Typography>
              <Typography variant="body1" color="textSecondary">
                {exchange + ':' + symbol}
              </Typography>
            </Grid>
            <Grid item={true}>
              <Typography variant="subtitle1">Industry</Typography>
              <Typography variant="body1" color="textSecondary">
                {industry}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const CompanyDetailContainer = connect(mapState)(CompanyDetail);

export { CompanyDetailContainer };
