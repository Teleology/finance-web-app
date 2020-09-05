import * as React from 'react';
import { get, keys, pipe, map } from 'lodash/fp';
import { extent, max, bisector } from 'd3-array';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { scaleTime, scaleLinear } from '@vx/scale';
import { timeDay } from 'd3-time';
import { localPoint } from '@vx/event';
import axios, { AxiosResponse } from 'axios';
import { LinePath } from '@vx/shape';
import { useTooltip, Tooltip, defaultStyles } from '@vx/tooltip';
import useStyles from './line-chart-style';

type Coordinate = {
  date: Date;
  price: number;
};

type Setting = {
  width: number;
  height: number;
  padding: number;
  xMax: number;
  yMax: number;
  xSelector: (Datum: Coordinate) => Date;
  ySelector: (Datum: Coordinate) => number;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  x: (Datum: Coordinate) => number;
  y: (Datum: Coordinate) => number;
};

export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: '1px solid white',
  color: 'white'
};

const settingFactory = (width: number, height: number, padding: number) => (data: Array<Coordinate>): Setting => {
  const xMax = width - padding;
  const yMax = height - padding;
  const xSelector = get<Coordinate, 'date'>('date');
  const ySelector = get<Coordinate, 'price'>('price');
  const xScale = scaleTime({
    range: [padding, xMax],
    domain: extent(data, xSelector) as [Date, Date]
  });
  const yScale = scaleLinear({
    range: [yMax, padding],
    domain: [0, max(data, ySelector)] as [number, number]
  });
  const x: Setting['x'] = pipe(xSelector, xScale);
  const y: Setting['y'] = pipe(ySelector, yScale);
  return {
    width,
    height,
    padding,
    xMax,
    yMax,
    xSelector,
    ySelector,
    xScale,
    yScale,
    x,
    y
  };
};

const useDefaultSetting = (data: Array<Coordinate>): Setting => React.useMemo(() => settingFactory(800, 800, 50)(data), [data]);
const bisectDate = bisector((datum: Coordinate): Date => datum.date).left;

const lineChartFactory = (useSetting: ReturnType<typeof settingFactory>, useStyles: ReturnType<make>) => (): React.ReactElement => {
  const [data, setData] = React.useState<Array<Coordinate>>([]);
  const { x, width, height, y, xScale } = useSetting(data);
  const { showTooltip, hideTooltip, tooltipOpen, tooltipLeft = 0, tooltipTop = 0, tooltipData } = useTooltip<Coordinate>();
  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      const { x: pointX, y: pointY } = localPoint(event) ?? { x: 0 };
      const x = xScale.invert(pointX);
      let index = bisectDate(data, x, 1);
      const [xLeft, xRight] = [data[index - 1].date, data[index].date];
      index = timeDay.count(x, xLeft) < timeDay.count(xRight, x) ? index - 1 : index;
      // console.log('pointX,' + pointX);
      showTooltip({
        tooltipData: data[index],
        tooltipLeft: pointX,
        tooltipTop: pointY
      });
    },
    [xScale, data, showTooltip]
  );

  React.useEffect(() => {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then((response: AxiosResponse) => {
      const data = response.data.bpi;
      const parsedData = pipe(
        keys,
        map((item: string) => ({ date: new Date(item), price: data[item] }))
      )(data);
      // console.log(parsedData);
      setData(parsedData);
    });
  }, []);
  // console.log(tooltipLeft);
  // console.log(tooltipData);
  return (
    <div>
      <svg width={width} height={height} onMouseMove={handleMouseMove} onMouseLeave={hideTooltip}>
        <LinePath data={data} x={x} y={y} strokeWidth={5} stroke="#000000" fill="transparent" />
      </svg>
      {tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          {tooltipData.date + ',' + tooltipData.price}
        </Tooltip>
      )}
    </div>
  );
};

const LineChart = lineChartFactory(useDefaultSetting);

export { LineChart };
