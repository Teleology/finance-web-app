import * as React from 'react';

import { connect } from 'react-redux';
import { CardContent, CardHeader, Divider, Grid, GridProps, IconButton, Typography, TypographyProps } from '@material-ui/core';
import { DesktopAccessDisabled as DesktopAccessDisabledIcon, LocationOn as LocationOnIcon, Favorite as FavoriteIcon } from '@material-ui/icons';
import { branch, renderComponent } from 'recompose';
import { isEmpty as _isEmpty, pick as _pick } from 'lodash';
import { flow } from 'lodash/fp';
import { RootState } from '../../../service/root-store';
import { ReadMoreTypography } from '../../common/read-more/read-more.component';
import { emptyIconProps } from '../../common-props';
import { LoadingContent, EmptyContent } from '../../common/loading-content/loading-content.component';
import { FetchStatusEnum } from '../../../utils/network-util';
import { DeepNonNullable } from '../../../utils/type-util';
import { companyDetailSelector, isCollectedCompanySelector } from '../../../service/company-info/company-info.selector';
import { companyCollectionAction } from '../../../service/company-collection/comany-collection.action';
import styles from './company-detail.styles';

const mapState = (state: RootState) =>
  ({
    detail: {
      isCollected: isCollectedCompanySelector(state),
      data: companyDetailSelector(state),
      fetchStatus: state.companyInfo.detail.fetchStatus
    }
  } as const);

const mapDispatch = _pick<typeof companyCollectionAction, 'addCompany' | 'removeCompany'>(companyCollectionAction, ['addCompany', 'removeCompany']);

type MapStateProps = ReturnType<typeof mapState>;
type MapDispatchProps = typeof mapDispatch;
const textGridContainerProps: GridProps = { container: true, item: true };
const textGridItemProps: GridProps = { item: true, xs: 6 };
const textSubTitleProps: TypographyProps = { variant: 'subtitle1' };
const textBodyProps: TypographyProps = { variant: 'body1', color: 'textSecondary' };

const CompanyDetailBase = (props: DeepNonNullable<MapStateProps> & MapDispatchProps): React.ReactElement => {
  const { useCardHeaderStyles, useCardHeaderIconStyles } = styles;
  const cardContentStyles = styles.useCardContentStyles();
  const {
    detail: { data, isCollected },
    addCompany,
    removeCompany
  } = props;
  const { name, symbol, exchange, industry, address, fullTimeEmployees, marketCapitalization, ebitda, pegRatio, sector, description } = data;
  const actionButtonProps = React.useMemo(() => {
    if (isCollected) {
      return {
        handleClick: (): void => {
          removeCompany({ label: name, value: symbol });
        },
        color: 'primary' as 'primary'
      };
    } else {
      return {
        handleClick: (): void => {
          addCompany({ label: name, value: symbol });
        },
        color: undefined
      };
    }
  }, [addCompany, isCollected, name, removeCompany, symbol]);

  return (
    <>
      <CardHeader
        title={symbol}
        classes={useCardHeaderStyles()}
        action={
          <IconButton onClick={actionButtonProps.handleClick}>
            <FavoriteIcon color={actionButtonProps.color} />
          </IconButton>
        }
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
      <CardContent classes={cardContentStyles}>
        <ReadMoreTypography>{description}</ReadMoreTypography>
      </CardContent>
    </>
  );
};

const companyDetailLoadingBranch = branch(
  (props: MapStateProps & MapDispatchProps) => props.detail.fetchStatus === FetchStatusEnum.PENDING,
  renderComponent(LoadingContent)
);

const companyDetailEmptyBranch = branch(
  (props: MapStateProps & MapDispatchProps) => _isEmpty(props.detail.data),
  renderComponent(() => (
    <EmptyContent
      classes={styles.useEmptyContentStyles()}
      icon={<DesktopAccessDisabledIcon {...emptyIconProps} />}
      text="Please use search for or select a company"
    />
  ))
);

const CompanyDetailContainer: React.FC<{}> = flow(companyDetailEmptyBranch, companyDetailLoadingBranch, connect(mapState, mapDispatch))(CompanyDetailBase);

export { CompanyDetailContainer };
