import { makeStyles, Theme } from '@material-ui/core/styles';
import { ListItemIconClassKey } from '@material-ui/core';
import { StyleRules } from '@material-ui/styles/withStyles';
const useContainerStyles = makeStyles((theme: Theme) => ({
  paperAnchorLeft: {
    color: theme.palette.text.secondary,
    minWidth: '256px'
  }
}));

const useListItemIconStyles = makeStyles(
  (theme: Theme) =>
    ({
      root: {
        color: theme.palette.text.secondary
      }
    } as StyleRules<{}, ListItemIconClassKey>)
);

export default {
  useContainerStyles,
  useListItemIconStyles
};
