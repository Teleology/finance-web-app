import * as React from 'react';
import { get, pipe, map } from 'lodash/fp';
import { extent, max } from 'd3-array';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinePath } from '@vx/shape';

type Coordinate = {
  date: Date;
  price: number;
};

type Setting = {
  width: number;
  height: number;
  padding: number;
  xMaxRange: number;
  yMaxRange: number;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  x: (Datum: Coordinate) => number;
  y: (Datum: Coordinate) => number;
};

export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';

const settingFactory = (width: number, height: number, padding: number) => (data: Array<Coordinate>): Setting => {
  const xMaxRange = width - padding;
  const yMaxRange = height - padding;
  const xSelector: (datum: Coordinate) => Date = get<Coordinate, 'date'>('date');
  const ySelector: (datum: Coordinate) => number = get<Coordinate, 'price'>('price');
  const xScale = scaleTime({
    range: [padding, xMaxRange],
    domain: extent(data, xSelector) as [Date, Date]
  });
  const yScale = scaleLinear({
    range: [yMaxRange, padding],
    domain: [0, max(data, ySelector)] as [number, number]
  });
  const x: Setting['x'] = pipe(xSelector, xScale);
  const y: Setting['y'] = pipe(ySelector, yScale);
  return {
    width,
    height,
    padding,
    xMaxRange,
    yMaxRange,
    xScale,
    yScale,
    x,
    y
  };
};

const getDefaultSetting = settingFactory(800, 800, 50);

const lineChartFactory = (getSetting: ReturnType<typeof settingFactory>) => (data: Array<Coordinate>): React.ReactElement => {
  const { width, height, padding, x, y, xScale, yScale, yMaxRange } = React.useMemo(() => getSetting(data), [data]);

  return (
    <svg width={width} height={height}>
      <AxisBottom scale={xScale} top={yMaxRange} tickFormat={timeFormat('%m/%d/%Y')} />
      <AxisLeft scale={yScale} left={padding} hideZero={true} />
      <LinePath data={data} x={x} y={y} strokeWidth={5} stroke="#000000" fill="transparent" />
      {map((datum: Coordinate) => {
        const { price, date } = datum;
        const x = xScale(date);
        const y = yScale(price);
        return <circle key={x} cx={x} cy={y} r={4} fill="black" fillOpacity={0.1} stroke="black" strokeOpacity={0.1} strokeWidth={2} pointerEvents="none" />;
      })(data)}
    </svg>
  );
};

const LineChart = lineChartFactory(getDefaultSetting);

export { LineChart };
