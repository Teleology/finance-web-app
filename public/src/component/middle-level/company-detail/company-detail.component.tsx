import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Divider, Grid, GridProps, Typography, TypographyProps } from '@material-ui/core';
import { LocationOn as LocationOnIcon, DesktopAccessDisabled as DesktopAccessDisabledIcon, Description as DescriptionIcon } from '@material-ui/icons';
import { branch, renderComponent } from 'recompose';
import { isEmpty as _isEmpty } from 'lodash';
import { RootState } from '../../../service/root-store';
import { ReadMoreTypography } from '../../bottom-level/read-more/read-more.component';
import { EmptyContent } from '../../bottom-level/empty-content/empty-content.component';
import styles from './company-detail.styles';
import { emptyIconProps } from '../../common-props';
const mapState = ({ companyInfo }: RootState) =>
  ({
    detail: companyInfo.detail
  } as const);

type Props = ReturnType<typeof mapState>;
const textGridContainerProps: GridProps = { container: true, item: true };
const textGridItemProps: GridProps = { item: true, xs: 6 };
const textSubTitleProps: TypographyProps = { variant: 'subtitle1' };
const textBodyProps: TypographyProps = { variant: 'body1', color: 'textSecondary' };

// TODO: link for stock symbol, $, s format for number and strings
const CompanyDetailBase = (props: Props): React.ReactElement => {
  const { useCardStyles, useCardHeaderStyles, useCardHeaderIconStyles } = styles;
  // TODO remove null check
  const { name, symbol, exchange, industry, address, fullTimeEmployees, marketCapitalization, ebitda, pegRatio, sector, description } = props.detail!!!;
  return (
    <Card classes={useCardStyles()}>
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
    </Card>
  );
};

const CompanyDetail = branch(
  (props: Props) => _isEmpty(props.detail),
  renderComponent(() => <EmptyContent icon={<DesktopAccessDisabledIcon {...emptyIconProps} />} text="Please use search for or select a company" />)
)(CompanyDetailBase);

const CompanyDetailContainer = connect(mapState)(CompanyDetail);

export { CompanyDetailContainer };
