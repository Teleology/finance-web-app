import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { GridClassKey, TypographyClassKey } from '@material-ui/core';

const useNewsSectionStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    display: 'block'
  }
}));

const useTitleStyles = makeStyles({
  root: {
    padding: 0,
    fontSize: '2.4rem'
  }
} as StyleRules<TypographyClassKey>);

const useParagraphStyles = makeStyles(
  ({ palette, spacing }: Theme) =>
    ({
      root: {
        color: palette.grey[600],
        paddingTop: spacing(0.5),
        paddingBottom: spacing(0.5)
      }
    } as StyleRules<GridClassKey>)
);

const useParagraphFootStyles = makeStyles(({ palette }: Theme) => ({ root: { color: palette.grey[700], overflow: 'hidden' } } as StyleRules<GridClassKey>));

export default { useParagraphFootStyles, useParagraphStyles, useNewsSectionStyles, useTitleStyles };
