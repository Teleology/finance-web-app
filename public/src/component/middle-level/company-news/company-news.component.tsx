import * as React from 'react';
import { CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { map as _map, pick as _pick } from 'lodash';
import { connect } from 'react-redux';
import { RootState } from '../../../service/root-store';
import { NewsUnit } from '../../../service/company-info/company-info-util';
import { companyInfoAction } from '../../../service/company-info/company-info.action';
const mapState = ({ companyInfo, companyCollection }: RootState) =>
  ({
    newsList: companyInfo.newsList,
    company: companyCollection.collection.value
  } as const);

const mapDispatch = _pick<typeof companyInfoAction, 'getNews'>(companyInfoAction, ['getNews']);

type Props = ReturnType<typeof mapState> & typeof mapDispatch;
const CompanyNews = (props: Props): React.ReactElement => {
  const { newsList, company, getNews } = props;
  React.useEffect(() => {
    company !== null && getNews(company);
  }, [company, getNews]);
  return (
    <>
      <CardHeader title={company} />
      <CardContent>
        <Grid direction="column" container={true}>
          {_map(newsList, (datum: NewsUnit) => (
            <Typography variant="body1" key={datum.title + datum.source}>
              {JSON.stringify(datum)}
            </Typography>
          ))}
        </Grid>
      </CardContent>
    </>
  );
};

const CompanyNewsContainer = connect(mapState, mapDispatch)(CompanyNews);

export { CompanyNewsContainer };
