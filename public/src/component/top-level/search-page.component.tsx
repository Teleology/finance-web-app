import * as React from 'react';
import { Grid, Divider, Card, CardHeader, CardContent } from '@material-ui/core';
import { CompanySearchContainer } from '../middle-level/company-search/company-search.component';
import { CompanyDetailContainer } from '../middle-level/company-detail/company-detail.component';
import { SelectionPanelContainer } from '../middle-level/selection-panel/selection-panel.component';
import { useCardContainerStyles, useCardContentStyles, useCardStyles, useFullFlexStyles } from '../common-styles';

const SearchPage = (): React.ReactElement => {
  const cardClasses = useCardStyles(),
    fullFlexStyles = useFullFlexStyles(),
    cardContainerStyles = useCardContainerStyles(),
    cardContentStyles = useCardContentStyles();
  return (
    <Grid direction="row" container={true} classes={fullFlexStyles}>
      <Grid item={true} xs={4} classes={cardContainerStyles}>
        <Card classes={cardClasses}>
          <CardHeader subheader="choose a company from the below options" title="Selection" />
          <Divider />
          <CardContent classes={cardContentStyles}>
            <SelectionPanelContainer />
          </CardContent>
        </Card>
      </Grid>
      <Grid item={true} xs={4} classes={cardContainerStyles}>
        <Card classes={cardClasses}>
          <CardHeader subheader="type a company name in the below line" title="Search" />
          <Divider />
          <CardContent classes={cardContentStyles}>
            <CompanySearchContainer />
          </CardContent>
        </Card>
      </Grid>
      <Grid item={true} xs={4} classes={cardContainerStyles}>
        <Card classes={cardClasses}>
          <CompanyDetailContainer />
        </Card>
      </Grid>
    </Grid>
  );
};

export { SearchPage };
