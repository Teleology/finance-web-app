import * as React from 'react';
import { get, keys, pipe, map } from 'lodash/fp';
import { extent, max } from 'd3-array';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinePath } from '@vx/shape';
import axios, { AxiosResponse } from 'axios';
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
  xScale: (x: Date) => number;
  yScale: (y: number) => number;
  x: (Datum: Coordinate) => number;
  y: (Datum: Coordinate) => number;
};

const useSettings = (data: Array<Coordinate>): Setting => {
  const width = 800;
  const height = 800;
  const padding = 50;
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
  const x = pipe(xSelector, xScale);
  const y = pipe(ySelector, yScale);
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
const LineChart = (): React.ReactElement => {
  const [data, setData] = React.useState<Array<Coordinate>>([]);
  React.useEffect(() => {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then((response: AxiosResponse) => {
      const data = response.data.bpi;
      const parsedData = pipe(
        keys,
        map((item: string) => ({ date: new Date(item), price: data[item] }))
      )(data);
      console.log(parsedData);
      setData(parsedData);
    });
  }, []);
  const { x, width, height, y } = useSettings(data);

  return (
    <svg width={width} height={height} style={{ backgroundColor: '#32deaa' }}>
      <LinePath data={data} x={x} y={y} strokeWidth={5} stroke="#FFFFFF" fill="transparent" />
    </svg>
  );
};

export { LineChart };
