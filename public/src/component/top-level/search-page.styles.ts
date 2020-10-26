import { makeStyles, Theme, StyleRules } from '@material-ui/core/styles';
import { CardClassKey } from '@material-ui/core';

const useCardStyles = makeStyles(
  ({ spacing }: Theme) =>
    ({
      root: {
        minHeight: 200,
        margin: spacing(2)
      }
    } as StyleRules<CardClassKey>)
);

export default {
  useCardStyles
};
