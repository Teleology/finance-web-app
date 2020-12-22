import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { CardClassKey, CardContentClassKey, GridClassKey } from '@material-ui/core';

const fullFlexStyles = {
  flexGrow: 1,
  minHeight: 0
};

const useFullFlexItemStyles = makeStyles({
  root: fullFlexStyles
});

const useCardStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
} as StyleRules<CardClassKey>);

const useCardContainerStyles = makeStyles(
  ({ spacing }: Theme) =>
    ({
      root: {
        padding: spacing(2),
        minHeight: 0,
        height: '100%'
      }
    } as StyleRules<GridClassKey>)
);

const useCardContentStyles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: 0,
    overflow: 'auto'
  }
} as StyleRules<CardContentClassKey>);

export { fullFlexStyles, useFullFlexItemStyles, useCardContainerStyles, useCardContentStyles, useCardStyles };
