import * as React from 'react';
import { get, flow, map } from 'lodash/fp';
import { extent } from 'd3-array';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { LinePath } from '@visx/shape';
import { TimeChartDataUnit } from '../../../service/stock-time-series/stock-time-series.typing';
type Coordinate = TimeChartDataUnit;

type Setting = {
  width: number;
  height: number;
  padding: number;
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

const settingFactory = (width: number, height: number, padding: number) => (data: Array<Coordinate>): Setting => {
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
    width,
    height,
    padding,
    xMaxRange,
    yMaxRange,
    xScale,
    yScale,
    renderX,
    renderY
  };
};

const getDefaultSetting = settingFactory(800, 800, 50);

// eslint-disable-next-line react/display-name
const lineChartFactory = (getSetting: ReturnType<typeof settingFactory>) => ({ data }: Props): React.ReactElement => {
  const { width, height, padding, renderX, renderY, xScale, yScale, yMaxRange } = React.useMemo(() => getSetting(data), [data]);

  return (
    <svg width={width} height={height}>
      <AxisBottom<ScaleTime<number, number>> scale={xScale} top={yMaxRange} />
      <AxisLeft scale={yScale} left={padding} hideZero={true} />
      <LinePath data={data} x={renderX} y={renderY} strokeWidth={5} stroke="#000000" fill="transparent" />
      {map((datum: Coordinate) => {
        const { y, x } = datum;
        const cx = xScale(x);
        const cy = yScale(y);
        return <circle key={cx} cx={cx} cy={cy} r={4} fill="black" fillOpacity={0.1} stroke="black" strokeOpacity={0.1} strokeWidth={2} pointerEvents="none" />;
      })(data)}
    </svg>
  );
};

const LineChart = lineChartFactory(getDefaultSetting);

export { LineChart };
