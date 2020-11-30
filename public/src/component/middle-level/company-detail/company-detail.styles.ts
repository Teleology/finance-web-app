import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { CardClassKey, CardContentClassKey, CardHeaderClassKey, IconClassKey } from '@material-ui/core';
import { commonStyles } from '../../common-styles';

const useCardStyles = makeStyles({
  root: commonStyles.cardStyles
} as StyleRules<CardClassKey>);

const useEmptyContentStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    paddingTop: spacing(2),
    paddingBottom: spacing(2)
  }
}));
const useCardHeaderStyles = makeStyles(
  (theme: Theme) =>
    ({
      subheader: theme.typography.h5
    } as StyleRules<CardHeaderClassKey>)
);

const useCardContentStyles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: 0
  }
} as StyleRules<CardContentClassKey>);

const useCardHeaderIconStyles = makeStyles({
  root: {
    verticalAlign: 'bottom'
  }
} as StyleRules<IconClassKey>);

export default { useCardStyles, useCardHeaderStyles, useCardHeaderIconStyles, useEmptyContentStyles, useCardContentStyles };
