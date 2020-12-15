import * as React from 'react';
import { ScaleTime, NumberValue } from 'd3-scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { withParentSize } from '@visx/responsive';
import { AreaClosed } from '@visx/shape';
import { WithParentSizeProps, WithParentSizeProvidedProps } from '@visx/responsive/lib/enhancers/withParentSize';
import { TickLabelProps } from '@visx/axis/lib/types';
import { formatDayMonth } from '../../../../utils/formatter';
import { TimeNumberCoordinate, timeNumberSetting } from '../chart-setting';
// TODO: extract common styles for line-chart and area-close
import styles from '../area-chart/area-chart.styles';
type Props = {
  data: Array<TimeNumberCoordinate>;
  padding?: number;
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

const AreaChartComponent = (props: Props & WithParentSizeProps & WithParentSizeProvidedProps): React.ReactElement => {
  const { data, parentWidth: width, parentHeight: height, padding = 32 } = props;
  // TODO: strict null check
  const { renderX, renderY, xScale, yScale, yMaxRange } = React.useMemo(() => timeNumberSetting(width!!!, height!!!, padding, data), [
    width,
    height,
    padding,
    data
  ]);
  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <AxisBottom<ScaleTime<number, number>>
          scale={xScale}
          top={yMaxRange}
          tickFormat={formatDayMonth as (value: Date | NumberValue) => string}
          tickLabelProps={tickLabelProps.bottom}
          {...styles.axisStyleProps}
        />
        <AxisLeft scale={yScale} left={padding} hideZero={true} tickLabelProps={tickLabelProps.left} {...styles.axisStyleProps} />
        <AreaClosed<TimeNumberCoordinate> {...styles.areaClosedStyleProps} data={data} x={renderX} y={renderY} yScale={yScale} />
      </svg>
    </div>
  );
};

const LineChart = withParentSize<Props & WithParentSizeProps & WithParentSizeProvidedProps>(AreaChartComponent);
export { LineChart };
