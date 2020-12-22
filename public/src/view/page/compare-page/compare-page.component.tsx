import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { StockSeriesCompareContainer } from '../../container/stock-series-compare/stock-series-compare.component';
import { useFullFlexItemStyles } from '../../common-styles';
import styles from './compare-page.styles';

export const ComparePage = (): React.ReactElement => {
  const cardStyles = styles.useCardStyles(),
    fullFlexItemStyles = useFullFlexItemStyles();
  return (
    <Card classes={cardStyles}>
      <CardHeader title="My Watch List" />
      <CardContent classes={fullFlexItemStyles}>
        <p>123</p>
      </CardContent>
    </Card>
  );
};
