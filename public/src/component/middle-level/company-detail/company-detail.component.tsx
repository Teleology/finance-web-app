import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Divider, Grid, GridProps, Typography, TypographyProps } from '@material-ui/core';
import { DesktopAccessDisabled as DesktopAccessDisabledIcon, LocationOn as LocationOnIcon } from '@material-ui/icons';
import { branch, renderComponent } from 'recompose';
import { isEmpty as _isEmpty } from 'lodash';
import { flow } from 'lodash/fp';
import { RootState } from '../../../service/root-store';
import { ReadMoreTypography } from '../../bottom-level/read-more/read-more.component';
import { EmptyContent } from '../../bottom-level/empty-content/empty-content.component';
import { emptyIconProps } from '../../common-props';
import { LoadingContent, LoadingContentWrapper } from '../../bottom-level/loading-content/loading-content.component';
import { FetchStatusEnum } from '../../../utils/network-util';
import { DeepNonNullable } from '../../../utils/type-util';
import { companyDetailSelector } from '../../../service/company-info/company-info.selector';
import styles from './company-detail.styles';

const mapState = (state: RootState) =>
  ({
    detail: {
      data: companyDetailSelector(state),
      fetchStatus: state.companyInfo.detail.fetchStatus
    }
  } as const);

type Props = ReturnType<typeof mapState>;
const textGridContainerProps: GridProps = { container: true, item: true };
const textGridItemProps: GridProps = { item: true, xs: 6 };
const textSubTitleProps: TypographyProps = { variant: 'subtitle1' };
const textBodyProps: TypographyProps = { variant: 'body1', color: 'textSecondary' };

const CompanyDetailBase = (props: DeepNonNullable<Props>): React.ReactElement => {
  const { useCardHeaderStyles, useCardHeaderIconStyles } = styles;
  const { name, symbol, exchange, industry, address, fullTimeEmployees, marketCapitalization, ebitda, pegRatio, sector, description } = props.detail.data;
  // TODO: remove???
  return (
    <LoadingContentWrapper isLoading={false}>
      <CardHeader
        title={symbol}
        classes={useCardHeaderStyles()}
        subheader={
          <>
            {name}
            &nbsp;&nbsp;&nbsp;
            <LocationOnIcon classes={useCardHeaderIconStyles()} />
            {address}
          </>
        }
        titleTypographyProps={{ variant: 'h3' }}
      />
      <Divider />
      <CardContent>
        <Grid container={true} spacing={2} direction="column">
          <Grid {...textGridContainerProps}>
            <Grid {...textGridItemProps}>
              <Typography {...textSubTitleProps}>Stock Symbol</Typography>
              <Typography {...textBodyProps}>{exchange + ':' + symbol}</Typography>
            </Grid>
            <Grid {...textGridItemProps}>
              <Typography {...textSubTitleProps}>Industry</Typography>
              <Typography {...textBodyProps}>{industry + ' ' + sector}</Typography>
            </Grid>
          </Grid>
          <Grid {...textGridContainerProps}>
            <Grid {...textGridItemProps}>
              <Typography {...textSubTitleProps}>FullTime Employees</Typography>
              <Typography {...textBodyProps}>{fullTimeEmployees}</Typography>
            </Grid>
            <Grid {...textGridItemProps}>
              <Typography {...textSubTitleProps}>Market Cap</Typography>
              <Typography {...textBodyProps}>{marketCapitalization}</Typography>
            </Grid>
          </Grid>
          <Grid {...textGridContainerProps}>
            <Grid {...textGridItemProps}>
              <Typography {...textSubTitleProps}>EBITDA</Typography>
              <Typography {...textBodyProps}>{ebitda}</Typography>
            </Grid>
            <Grid {...textGridItemProps}>
              <Typography {...textSubTitleProps}>Peg Ratio</Typography>
              <Typography {...textBodyProps}>{pegRatio}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <ReadMoreTypography>{description}</ReadMoreTypography>
      </CardContent>
    </LoadingContentWrapper>
  );
};

const companyDetailLoadingBranch = branch((props: Props) => props.detail.fetchStatus === FetchStatusEnum.PENDING, renderComponent(LoadingContent));

const companyDetailEmptyBranch = branch(
  (props: Props) => _isEmpty(props.detail.data),
  renderComponent(() => (
    <EmptyContent
      classes={styles.useEmptyContentStyles()}
      icon={<DesktopAccessDisabledIcon {...emptyIconProps} />}
      text="Please use search for or select a company"
    />
  ))
);

const CompanyDetail: React.FC<Props> = flow(companyDetailEmptyBranch, companyDetailLoadingBranch)(CompanyDetailBase);

const CompanyDetailContainer = connect(mapState)(
  (props: Props): React.ReactElement => (
    <Card classes={styles.useCardStyles()}>
      <CompanyDetail {...props} />
    </Card>
  )
);

export { CompanyDetailContainer };
