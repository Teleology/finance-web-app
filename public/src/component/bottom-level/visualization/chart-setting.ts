import { flow, get } from 'lodash/fp';
import { scaleLinear, scaleTime } from '@visx/scale';
import { extent } from 'd3-array';
import { ScaleLinear, ScaleTime } from 'd3-scale';

type TimeNumberCoordinate = {
  x: Date;
  y: number;
};

type TimeNumberSetting = {
  xMaxRange: number;
  yMaxRange: number;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  renderX: (Datum: TimeNumberCoordinate) => number;
  renderY: (Datum: TimeNumberCoordinate) => number;
};

const timeNumberSetting = (width: number, height: number, padding: number, data: Array<TimeNumberCoordinate>): TimeNumberSetting => {
  const xMaxRange = width - padding;
  const yMaxRange = height - padding;
  const xSelector: (datum: TimeNumberCoordinate) => Date = get<TimeNumberCoordinate, 'x'>('x');
  const ySelector: (datum: TimeNumberCoordinate) => number = get<TimeNumberCoordinate, 'y'>('y');
  const xScale = scaleTime({
    range: [padding, xMaxRange],
    domain: extent(data, xSelector) as [Date, Date]
  });
  const yScale = scaleLinear({
    range: [yMaxRange, padding],
    domain: extent(data, ySelector) as [number, number]
  });
  // TODO: undefined check
  const renderX = flow(xSelector, xScale) as TimeNumberSetting['renderX'];
  const renderY = flow(ySelector, yScale) as TimeNumberSetting['renderY'];
  return {
    xMaxRange,
    yMaxRange,
    xScale,
    yScale,
    renderX,
    renderY
  };
};

export { timeNumberSetting, TimeNumberCoordinate };
