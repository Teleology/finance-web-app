import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { IconButtonClassKey, IconClassKey } from '@material-ui/core';

const useIconButtonStyles = makeStyles(
  ({ palette }: Theme) =>
    ({
      root: {
        padding: 0,
        fontSize: 'inherit',
        color: palette.info.main
      }
    } as StyleRules<IconButtonClassKey>)
);

const useIconStyles = makeStyles({
  root: {
    fontSize: 'inherit'
  }
} as StyleRules<IconClassKey>);

export default { useIconButtonStyles, useIconStyles };
