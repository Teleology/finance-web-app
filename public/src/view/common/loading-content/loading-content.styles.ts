import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { GridClassKey } from '@material-ui/core';

const useGridStyles = makeStyles(
  ({ spacing }: Theme) =>
    ({
      root: {
        paddingTop: spacing(1),
        paddingBottom: spacing(1)
      }
    } as StyleRules<GridClassKey>)
);


export default { useGridStyles };
