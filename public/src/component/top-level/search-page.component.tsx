import * as React from 'react';
import { Grid, Divider, Card, CardHeader, CardContent } from '@material-ui/core';
import { CompanySearchContainer } from '../middle-level/company-search/company-search.component';
import { CompanyDetailContainer } from '../middle-level/company-detail/company-detail.component';
import { SelectionPanelContainer } from '../middle-level/selection-panel/selection-panel.component';
import styles from './search-page.styles';
const SearchPage = (): React.ReactElement => {
  const { useCardStyles } = styles;
  const cardClasses = useCardStyles();
  return (
    <Grid direction="row" container={true}>
      <Grid item={true} xs={3}>
        <Card classes={cardClasses}>
          <CardHeader subheader="choose a company from the below options" title="Selection" />
          <Divider />
          <CardContent>
            <SelectionPanelContainer />
          </CardContent>
        </Card>
        <Card classes={cardClasses}>
          <CardHeader subheader="type a company name in the below line" title="Search" />
          <CardContent>
            <CompanySearchContainer />
          </CardContent>
        </Card>
      </Grid>
      <Grid item={true} xs={9}>
        <CompanyDetailContainer />
      </Grid>
    </Grid>
  );
};


export { SearchPage };
