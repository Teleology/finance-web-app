import { lighten, makeStyles, Theme } from '@material-ui/core/styles';
import { LinearGradientProps } from '@visx/gradient/lib/gradients/LinearGradient';
import * as React from 'react';
import { theme } from '../../../theme';
import { AxisScale, CommonProps } from '@visx/axis';

const axisStyleProps: CommonProps<AxisScale> = {
  tickStroke: '#e5e5e5',
  stroke: '#e5e5e5'
};

const areaStrokeGradientProps: LinearGradientProps = {
  id: 'area-stroke-gradient',
  from: theme.palette.primary.dark,
  to: theme.palette.primary.dark,
  toOpacity: 0
};

const areaFillGradientProps: LinearGradientProps = {
  id: 'area-fill-gradient',
  from: theme.palette.primary.light,
  to: theme.palette.primary.light,
  toOpacity: 0.1
};

const areaClosedStyleProps = {
  stroke: `url(#${areaStrokeGradientProps.id})`,
  fill: `url(#${areaFillGradientProps.id})`
};

const useLabelStyles = makeStyles(({ typography }: Theme) => ({
  axis: {
    stroke: '#96A3A9',
    ...typography.body2
  }
}));

const circleStyleProps: React.SVGAttributes<SVGCircleElement> = {
  fill: theme.palette.primary.main,
  pointerEvents: 'none'
};

const lineStyleProps: React.SVGAttributes<SVGLineElement> = {
  strokeDasharray: '5 2',
  pointerEvents: 'none',
  strokeWidth: 2,
  stroke: lighten(theme.palette.primary.main, 0.3)
};

const useToolTipBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    border: '1px solid #e3e3e3',
    background: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 5,
    boxShadow: '2px 2px 6px -4px #999',
    ...theme.typography.body2,
    pointerEvents: 'none'
  }
}));

export default {
  axisStyleProps,
  useLabelStyles,
  areaFillGradientProps,
  areaStrokeGradientProps,
  areaClosedStyleProps,
  circleStyleProps,
  lineStyleProps,
  useToolTipBoxStyles
};
