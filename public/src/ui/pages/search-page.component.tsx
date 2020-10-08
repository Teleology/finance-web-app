import * as React from 'react';
import { Grid, Paper, Card } from '@material-ui/core';
import { CompanySearchContainer } from '../components/company-search.component';
import { CompanyDetailContainer } from '../components/company-detail/company-detail.component';
import { SelectionPanelContainer } from '../components/selection-panel/selection-panel.component';

const SearchPage = (): React.ReactElement => (
  <Grid direction="row" container={true} spacing={1}>
    <Grid item={true} xs={3}>
      <Card>
        <SelectionPanelContainer />
      </Card>
      <Card>
        <CompanySearchContainer />
      </Card>
    </Grid>
    <Grid item={true} xs={9}>
      <Paper>
        <CompanyDetailContainer />
      </Paper>
    </Grid>
  </Grid>
);

export { SearchPage };
