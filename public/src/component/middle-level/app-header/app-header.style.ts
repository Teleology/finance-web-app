import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { ToolbarClassKey, TypographyClassKey } from '@material-ui/core';
const useTitleStyles = makeStyles({
  h1: {
    flexGrow: 1
  }
} as StyleRules<TypographyClassKey>);

const usePlainStyles = makeStyles({
  iconContainer: {
    position: 'absolute'
  }
});

const useToolBarStyles = makeStyles(
  ({ spacing }: Theme) =>
    ({
      root: {
        paddingLeft: spacing(2)
      }
    } as StyleRules<ToolbarClassKey>)
);
export default {
  useTitleStyles,
  usePlainStyles,
  useToolBarStyles
};
