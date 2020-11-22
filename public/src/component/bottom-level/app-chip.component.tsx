import { Chip, Theme, withStyles } from '@material-ui/core';

const Breadcrumb = withStyles(({ palette, spacing, typography, shadows }: Theme) => ({
  root: {
    backgroundColor: palette.grey[100],
    height: spacing(3),
    color: palette.grey[800],
    fontWeight: typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: palette.primary.main,
      color: 'white'
    },
    '&:active': {
      boxShadow: shadows[1]
    }
  }
}))(Chip);

export { Breadcrumb };
