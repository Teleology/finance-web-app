import * as React from 'react';
import { get, keys, pipe, map } from 'lodash/fp';
import { extent, max, bisector } from 'd3-array';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { localPoint } from '@vx/event';
import axios, { AxiosResponse } from 'axios';
import { LinePath } from '@vx/shape';
import { useTooltip, Tooltip, defaultStyles } from '@vx/tooltip';
import useStyles from './line-chart-style';

type TCoordinate = {
  date: Date;
  price: number;
};

type TSetting = {
  width: number;
  height: number;
  padding: number;
  xMaxRange: number;
  yMaxRange: number;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  x: (Datum: TCoordinate) => number;
  y: (Datum: TCoordinate) => number;
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

const settingFactory = (width: number, height: number, padding: number) => (data: Array<TCoordinate>): TSetting => {
  const xMaxRange = width - padding;
  const yMaxRange = height - padding;
  const xSelector: (datum: TCoordinate) => Date = get<TCoordinate, 'date'>('date');
  const ySelector: (datum: TCoordinate) => number = get<TCoordinate, 'price'>('price');
  const xScale = scaleTime({
    range: [padding, xMaxRange],
    domain: extent(data, xSelector) as [Date, Date]
  });
  const yScale = scaleLinear({
    range: [yMaxRange, padding],
    domain: [0, max(data, ySelector)] as [number, number]
  });
  const x: TSetting['x'] = pipe(xSelector, xScale);
  const y: TSetting['y'] = pipe(ySelector, yScale);
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

const useDefaultSetting = (data: Array<TCoordinate>): TSetting => React.useMemo(() => settingFactory(800, 800, 50)(data), [data]);
const bisectDate = bisector((datum: TCoordinate): Date => datum.date).left;

const lineChartFactory = (useSetting: ReturnType<typeof settingFactory>) => (): React.ReactElement => {
  const { root } = useStyles();
  const [data, setData] = React.useState<Array<TCoordinate>>([]);
  const { width, height, padding, x, y, xScale, yScale, yMaxRange } = useSetting(data);
  const { showTooltip, hideTooltip, tooltipLeft = 0, tooltipTop = 0, tooltipData } = useTooltip<TCoordinate>();
  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      const { x: pointX } = localPoint(event) ?? { x: 0 };
      const x = xScale.invert(pointX);
      let index = bisectDate(data, x, 1, data.length - 1);
      const [xLeft, xRight] = [data[index - 1].date, data[index].date];
      index = x.getTime() - xLeft.getTime() < xRight.getTime() - x.getTime() ? index - 1 : index;
      showTooltip({
        tooltipData: data[index],
        tooltipLeft: xScale(data[index].date),
        tooltipTop: yScale(data[index].price)
      });
    },
    [xScale, yScale, data, showTooltip]
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
    <div className={root}>
      <svg width={width} height={height} onMouseMove={handleMouseMove} onMouseLeave={hideTooltip}>
        <AxisBottom scale={xScale} top={yMaxRange} tickFormat={timeFormat('%m/%d/%Y')} />
        <AxisLeft scale={yScale} left={padding} hideZero={true} />
        <LinePath data={data} x={x} y={y} strokeWidth={5} stroke="#000000" fill="transparent" />
        {map((datum: TCoordinate) => {
          const { price, date } = datum;
          const x = xScale(date);
          const y = yScale(price);
          return <circle key={x} cx={x} cy={y} r={4} fill="black" fillOpacity={0.1} stroke="black" strokeOpacity={0.1} strokeWidth={2} pointerEvents="none" />;
        })(data)}
        {tooltipData && (
          <>
            <circle
              cx={tooltipLeft}
              cy={tooltipTop + 1}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              pointerEvents="none"
            />
            <circle cx={tooltipLeft} cy={tooltipTop} r={4} fill={accentColorDark} stroke="white" strokeWidth={2} pointerEvents="none" />
          </>
        )}
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
