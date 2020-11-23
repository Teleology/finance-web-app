import * as React from 'react';
import { bisector } from 'd3-array';
import { ScaleTime, NumberValue } from 'd3-scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { withParentSize } from '@visx/responsive';
import { AreaClosed, Line } from '@visx/shape';
import { WithParentSizeProps, WithParentSizeProvidedProps } from '@visx/responsive/lib/enhancers/withParentSize';
import { TickLabelProps } from '@visx/axis/lib/types';
import { LinearGradient } from '@visx/gradient';
import { localPoint } from '@visx/event';
import { Tooltip, useTooltip } from '@visx/tooltip';
import { formatDayMonth } from '../../../../utils/formatter';
import { TimeNumberCoordinate, timeNumberSetting } from '../chart-setting';
import styles from './line-chart.styles';

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

const bisectDate = bisector((datum: TimeNumberCoordinate): Date => datum.x).left;
const LineChartFactory = (props: Props & WithParentSizeProps & WithParentSizeProvidedProps): React.ReactElement => {
  const { data, parentWidth: width, parentHeight: height, padding = 50 } = props;
  const { showTooltip, hideTooltip, tooltipLeft = 0, tooltipTop = 0, tooltipData } = useTooltip<TimeNumberCoordinate>();
  const toolTipBoxStyles = styles.useToolTipBoxStyles().root;
  // TODO: strict null check
  const { renderX, renderY, xScale, yScale, yMaxRange } = React.useMemo(() => timeNumberSetting(width!!!, height!!!, padding, data), [data, width, height]);
  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<SVGElement>) => {
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
          {...styles.axisStyleProps}
        />
        <AxisLeft scale={yScale} left={padding} hideZero={true} tickLabelProps={tickLabelProps.left} {...styles.axisStyleProps} />
        <AreaClosed<TimeNumberCoordinate> {...styles.areaClosedStyleProps} data={data} x={renderX} y={renderY} yScale={yScale} />
        {tooltipData && (
          <>
            <circle {...styles.circleStyleProps} cx={tooltipLeft} cy={tooltipTop} r={4} />
          </>
        )}
        {tooltipData && <Line {...styles.lineStyleProps} from={{ x: tooltipLeft, y: padding }} to={{ x: tooltipLeft, y: height!!! - padding }} />}
      </svg>
      {tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} className={toolTipBoxStyles}>
          {tooltipData.y}
          <br />
          {tooltipData.x.toString()}
        </Tooltip>
      )}
    </div>
  );
};

const LineChart = withParentSize<Props & WithParentSizeProps & WithParentSizeProvidedProps>(LineChartFactory);
export { LineChart };
