import { makeStyles, Theme } from '@material-ui/core/styles';

const useChartStyles = makeStyles(({ palette }: Theme) => ({
  path: {
    stroke: palette.secondary.main,
    fill: 'none',
    strokeWidth: 3
  },
  circle: {
    fill: palette.secondary.main
  }
}));

export default {
  useChartStyles
};
