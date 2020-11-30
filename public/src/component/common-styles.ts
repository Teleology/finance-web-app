import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { GridClassKey } from '@material-ui/core';

// TODO: remove immediately
const cardStyles = {};

const fullFlexStyles = {
  flexGrow: 1,
  minHeight: 0
};

const commonStyles = {
  cardStyles
};

const useFullFlexStyles = makeStyles({
  root: fullFlexStyles
});

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
export { commonStyles, fullFlexStyles, useFullFlexStyles, useCardContainerStyles };
