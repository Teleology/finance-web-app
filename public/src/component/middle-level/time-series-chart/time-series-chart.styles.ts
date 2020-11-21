import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { ChipClassKey } from '@material-ui/core';

const useBreadcrumbStyles = makeStyles(
  ({ palette }: Theme) =>
    ({
      root: (props: { isSelected: boolean }) => ({
        minWidth: 80,
        ...(props.isSelected && { backgroundColor: palette.secondary.light, color: 'white' })
      })
    } as StyleRules<ChipClassKey>)
);

export default { useBreadcrumbStyles };
