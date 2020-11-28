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
          {_map(newsList, (datum: NewsUnit) => {
            const { title, publishAt, description, author, image } = datum;
            return (
              <Grid container={true} direction="row" key={datum.title + datum.source}>
                <Typography variant="h1">{title}</Typography>
                <Typography variant="h5">{author}</Typography>
                <Typography variant="h5">{publishAt}</Typography>
                <Typography variant="body1">{description}</Typography>
                <Typography variant="body1">{image}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </>
  );
};

export const CompanyNewsContainer = connect(mapState, mapDispatch)(CompanyNews);
