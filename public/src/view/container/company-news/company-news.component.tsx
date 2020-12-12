import * as React from 'react';
import { CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';
import { map as _map, pick as _pick } from 'lodash';
import { connect } from 'react-redux';
import { RootState } from '../../../service/root-store';
import { NewsUnit } from '../../../service/company-info/company-info-util';
import { companyInfoAction } from '../../../service/company-info/company-info.action';
import { AppLinkBlock } from '../../common/app-link.component';
import { useCardContentStyles } from '../../common-styles';
import { activeCompanySelector } from '../../../service/company-collection/company-collection.selecor';
import styles from './company-news.styles';

const mapState = (state: RootState) =>
  ({
    newsList: state.companyInfo.newsList,
    company: activeCompanySelector(state)?.value
  } as const);

const mapDispatch = _pick<typeof companyInfoAction, 'getNews'>(companyInfoAction, ['getNews']);

type Props = ReturnType<typeof mapState> & typeof mapDispatch;
const CompanyNews = (props: Props): React.ReactElement => {
  const { newsList, company, getNews } = props;
  const paragraphStyles = styles.useParagraphStyles(),
    paragraphFootStyles = styles.useParagraphFootStyles(),
    newsSectionStyles = styles.useNewsSectionStyles().root,
    titleStyles = styles.useTitleStyles(),
    cardContentStyles = useCardContentStyles();

  React.useEffect(() => {
    company !== undefined && getNews(company);
  }, [company, getNews]);
  return (
    <>
      <CardHeader title={company} />
      <CardContent classes={cardContentStyles}>
        {_map(newsList, (datum: NewsUnit, index: number) => {
          const { title, publishedAt, description, author, image, source } = datum;
          return (
            <AppLinkBlock key={index} className={newsSectionStyles} href={source} target="_blank">
              <Divider />
              <Typography variant="h5" classes={titleStyles}>
                {title}
              </Typography>

              <Grid container={true} direction="row" classes={paragraphStyles}>
                <Grid item={true} xs={6}>
                  <Typography variant="body1">{description}</Typography>
                </Grid>
                <Grid item={true} xs={6}>
                  <img src={image} width="100%" />
                </Grid>
              </Grid>
              <Typography variant="h5" classes={paragraphFootStyles}>
                {author + ',' + publishedAt}
              </Typography>
            </AppLinkBlock>
          );
        })}
      </CardContent>
    </>
  );
};

export const CompanyNewsContainer = connect(mapState, mapDispatch)(CompanyNews);
