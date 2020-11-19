import { makeStyles, Theme } from '@material-ui/core/styles';

const useChartStyles = makeStyles(({ palette }: Theme) => ({
  path: {
    stroke: palette.secondary.main,
    fill: 'none',
    strokeWidth: 3
  },
  circle: {
    fill: palette.secondary.main
  },
  axis: {
    stroke: '#e5e5e5',
    strokeWidth: 1
  }
}));

const useLabelStyles = makeStyles(({ typography }: Theme) => ({
  axis: {
    stroke: '#96A3A9',
    ...typography.body2
  }
}));

export default {
  useChartStyles,
  useLabelStyles
};
