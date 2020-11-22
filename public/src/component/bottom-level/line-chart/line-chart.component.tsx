import * as React from 'react';
import { get, flow } from 'lodash/fp';
import { extent, bisector } from 'd3-array';
import { ScaleTime, ScaleLinear, NumberValue } from 'd3-scale';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom, CommonProps, AxisScale } from '@visx/axis';
import { withParentSize } from '@visx/responsive';
import { AreaClosed } from '@visx/shape';
import { WithParentSizeProps, WithParentSizeProvidedProps } from '@visx/responsive/lib/enhancers/withParentSize';
import { TickLabelProps } from '@visx/axis/lib/types';
import { LinearGradient } from '@visx/gradient';
import { localPoint } from '@visx/event';
import { Tooltip, useTooltip } from '@visx/tooltip';
import { TimeChartDataUnit } from '../../../service/stock-time-series/stock-time-series.typing';
import { formatDayMonth } from '../../../utils/formatter';
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
const axisCommonStyleProps: CommonProps<AxisScale> = {
  tickStroke: '#e5e5e5',
  stroke: '#e5e5e5'
};

const tickLabelProps = ((): { left: TickLabelProps<NumberValue>; bottom: TickLabelProps<NumberValue> } => {
  const commonProps = { fill: '#96A3A9', textAnchor: 'middle', fontSize: '1rem' } as const;
  const left: TickLabelProps<NumberValue> = () => ({ ...commonProps, verticalAnchor: 'middle', dx: -8 });
  const bottom: TickLabelProps<NumberValue> = () => commonProps;
  return {
    left,
    bottom
  };
})();

const bisectDate = bisector((datum: Coordinate): Date => datum.x).left;

const LineChartFactory = (props: Props & WithParentSizeProps & WithParentSizeProvidedProps): React.ReactElement => {
  const { data, parentWidth: width, parentHeight: height } = props;
  const padding = 50;
  const { showTooltip, hideTooltip, tooltipLeft = 0, tooltipTop = 0, tooltipData } = useTooltip<Coordinate>();
  const { renderX, renderY, xScale, yScale, yMaxRange } = React.useMemo(() => getSetting(width!!!, height!!!, padding, data), [data, width, height]);
  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      console.log('onMouseMove');
      const { x: pointX } = localPoint(event) ?? { x: 0 };
      const x = xScale.invert(pointX);
      let index = bisectDate(data, x, 1, data.length - 1);
      const [xLeft, xRight] = [data[index - 1].x, data[index].x];
      index = x.getTime() - xLeft.getTime() < xRight.getTime() - x.getTime() ? index - 1 : index;
      showTooltip({
        tooltipData: data[index],
        tooltipLeft: xScale(data[index].x),
        tooltipTop: yScale(data[index].y)
      });
    },
    [xScale, yScale, data, showTooltip]
  );
  console.log(tooltipTop);
  console.log(tooltipLeft);
  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height} onMouseMove={handleMouseMove} onMouseLeave={hideTooltip}>
        <LinearGradient {...styles.areaFillGradientProps} />
        <LinearGradient {...styles.areaStrokeGradientProps} />
        <AxisBottom<ScaleTime<number, number>>
          scale={xScale}
          top={yMaxRange}
          tickFormat={formatDayMonth as (value: Date | NumberValue) => string}
          tickLabelProps={tickLabelProps.bottom}
          {...axisCommonStyleProps}
        />
        <AxisLeft scale={yScale} left={padding} hideZero={true} tickLabelProps={tickLabelProps.left} {...axisCommonStyleProps} />
        <AreaClosed<Coordinate> {...styles.areaClosedStyleProps} data={data} x={renderX} y={renderY} yScale={yScale} />
      </svg>
      {tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={{ background: 'yellow', width: 100, height: 100 }}>
          {tooltipData.x + ',' + tooltipData.y}
        </Tooltip>
      )}
    </div>
  );
};

//      <LinePath data={data} x={renderX} y={renderY} className={chartStyles.path} />
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
