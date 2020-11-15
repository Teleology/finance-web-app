import { FormatSpecifier, format } from 'd3-format';
import * as dayjs from 'dayjs';

const formatMoney = format(new FormatSpecifier({ type: 's', trim: '~', symbol: '$' }).toString());
const formatLargeNumber = format(new FormatSpecifier({ comma: ',' }).toString());

const formatChartTime = (value: Date): string => dayjs(value).format('D MMM');

export { formatMoney, formatLargeNumber, formatChartTime };
