import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { RootState } from '../../../service/root-store';
import { NewsUnit } from '../../../service/company-info/company-info-util';
const mapState = ({ companyInfo }: RootState) =>
  ({
    newsList: companyInfo.newsList
  } as const);

type Props = ReturnType<typeof mapState>;
const NewsSection = ({ newsList }: Props): React.ReactElement => (
  <Grid direction="column" container={true}>
    {_.map(newsList, (datum: NewsUnit) => (
      <Typography variant="body1" key={datum.title + datum.source}>
        {JSON.stringify(datum)}
      </Typography>
    ))}
  </Grid>
);

const NewsSectionContainer = connect(mapState)(NewsSection);

export { NewsSectionContainer };
