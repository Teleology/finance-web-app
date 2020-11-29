import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { GridClassKey } from '@material-ui/core';

// TODO: remove immediately
const cardStyles = {};

const commonStyles = {
  cardStyles
};

const useFullFlexStyles = makeStyles({
  root: {
    flexGrow: 1
  }
} as StyleRules<GridClassKey>);

const useCardContainerStyles = makeStyles(
  ({ spacing }: Theme) =>
    ({
      root: {
        padding: spacing(2)
      }
    } as StyleRules<GridClassKey>)
);
export { commonStyles, useFullFlexStyles, useCardContainerStyles };
