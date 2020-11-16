import * as React from 'react';
import { get, flow, map } from 'lodash/fp';
import { extent } from 'd3-array';
import { ScaleTime, ScaleLinear, NumberValue } from 'd3-scale';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { ParentSize, withParentSize } from '@visx/responsive';
import { LinePath } from '@visx/shape';
import { WithParentSizeProps, WithParentSizeProvidedProps } from '@visx/responsive/lib/enhancers/withParentSize';
import { ParentSizeProps } from '@visx/responsive/lib/components/ParentSize';
import { TimeChartDataUnit } from '../../../service/stock-time-series/stock-time-series.typing';
import { formatChartTime } from '../../../utils/formatter';
import styles from './line-chart.styles';
type Coordinate = TimeChartDataUnit;

type Setting = {
  xMaxRange: number;
  yMaxRange: number;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  renderX: (Datum: Coordinate) => number;
  renderY: (Datum: Coordinate) => number;
};

type Props = {
  data: Array<Coordinate>;
};

export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';

const getSetting = (width: number, height: number, padding: number, data: Array<Coordinate>): Setting => {
  const xMaxRange = width - padding;
  const yMaxRange = height - padding;
  const xSelector: (datum: Coordinate) => Date = get<Coordinate, 'x'>('x');
  const ySelector: (datum: Coordinate) => number = get<Coordinate, 'y'>('y');
  const xScale = scaleTime({
    range: [padding, xMaxRange],
    domain: extent(data, xSelector) as [Date, Date]
  });
  const yScale = scaleLinear({
    range: [yMaxRange, padding],
    domain: extent(data, ySelector) as [number, number]
  });
  // TODO: undefined check
  const renderX = flow(xSelector, xScale) as Setting['renderX'];
  const renderY = flow(ySelector, yScale) as Setting['renderY'];
  return {
    xMaxRange,
    yMaxRange,
    xScale,
    yScale,
    renderX,
    renderY
  };
};

// const getDefaultSetting = settingFactory(800, 800, 50);

// eslint-disable-next-line react/display-name
// const lineChartFactory = (getSetting: ReturnType<typeof settingFactory>) => (
//   props: Props & WithParentSizeProps & WithParentSizeProvidedProps
// ): React.ReactElement => {
//   const { path } = styles.useChartStyles();
//   const { data, parentWidth, parentHeight } = props;
//   const { padding, renderX, renderY, xScale, yScale, yMaxRange } = React.useMemo(() => getSetting(data), [data]);
//   return (
//     <svg width={parentWidth} height={parentHeight}>
//       <AxisBottom<ScaleTime<number, number>> scale={xScale} top={yMaxRange} tickFormat={formatChartTime as (value: Date | NumberValue) => string} />
//       <AxisLeft scale={yScale} left={padding} hideZero={true} />
//       <LinePath data={data} x={renderX} y={renderY} className={path} />
//     </svg>
//   );
// };

const LineChartFactory = (props: Props & WithParentSizeProps & WithParentSizeProvidedProps): React.ReactElement => {
  console.log('re-render');
  const { path } = styles.useChartStyles();
  const { data, parentWidth: width, parentHeight: height } = props;
  console.log(width, height);
  const padding = 50;
  const { renderX, renderY, xScale, yScale, yMaxRange } = React.useMemo(() => getSetting(width!!!, height!!!, padding, data), [data, width, height]);
  return (
    <svg width={width} height={height}>
      <AxisBottom<ScaleTime<number, number>> scale={xScale} top={yMaxRange} tickFormat={formatChartTime as (value: Date | NumberValue) => string} />
      <AxisLeft scale={yScale} left={padding} hideZero={true} />
      <LinePath data={data} x={renderX} y={renderY} className={path} />
    </svg>
  );
};

// const LineChart = (props: Props) => <ParentSize>{(parent) => <LineChartFactory {...props} width={parent.width} height={parent.height} />}</ParentSize>;
const LineChart = withParentSize<Props & WithParentSizeProps & WithParentSizeProvidedProps>(LineChartFactory);
export { LineChart };

/*
      {map((datum: Coordinate) => {
        const { y, x } = datum;
        const cx = xScale(x);
        const cy = yScale(y);
        return <circle key={cx} cx={cx} cy={cy} r={4} pointerEvents="none" className={circle} />;
      })(data)}
 */
