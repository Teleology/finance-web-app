import { makeStyles, Theme } from '@material-ui/core/styles';
import { LinearGradientProps } from '@visx/gradient/lib/gradients/LinearGradient';
import { theme } from '../../../theme';

const areaStrokeGradientProps: LinearGradientProps = {
  id: 'area-stroke-gradient',
  from: theme.palette.secondary.dark,
  to: theme.palette.secondary.dark,
  toOpacity: 0
};

const areaFillGradientProps: LinearGradientProps = {
  id: 'area-fill-gradient',
  from: theme.palette.secondary.light,
  to: theme.palette.secondary.light,
  toOpacity: 0.1
};

const areaClosedStyleProps = {
  stroke: `url(#${areaStrokeGradientProps.id})`,
  fill: `url(#${areaFillGradientProps.id})`
};

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
  useLabelStyles,
  areaFillGradientProps,
  areaStrokeGradientProps,
  areaClosedStyleProps
};
