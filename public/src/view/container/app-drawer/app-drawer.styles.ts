import { makeStyles, Theme, StyleRules } from '@material-ui/core/styles';
import { ListItemIconClassKey } from '@material-ui/core';
import { TreeItemClassKey } from '@material-ui/lab';
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
    } as StyleRules<ListItemIconClassKey>)
);

const useTreeParentStyles = makeStyles({
  label: {
    backgroundColor: 'rgba(0,0,0,0) !important'
  },
  iconContainer: {
    marginRight: 36,
    justifyContent: 'flex-start',
    '& svg': {
      fontSize: 24
    }
  }
});

const useTreeChildStyles = makeStyles({
  root: {
    padding: '4px 0 4px 8px'
  },
  label: {
    backgroundColor: 'rgba(0,0,0,0) !important'
  }
} as StyleRules<TreeItemClassKey>);

export default {
  useContainerStyles,
  useListItemIconStyles,
  useTreeParentStyles,
  useTreeChildStyles
};
