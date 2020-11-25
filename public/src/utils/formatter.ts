import { FormatSpecifier, format } from 'd3-format';
import * as dayjs from 'dayjs';

// TODO: remove this usage
const formatMoney = format(new FormatSpecifier({ symbol: '$' }).toString());
const formatLargeMoney = format(new FormatSpecifier({ type: 's', trim: '~', symbol: '$' }).toString());
const formatLargeNumber = format(new FormatSpecifier({ comma: ',' }).toString());
const formatPercent = format(new FormatSpecifier({ type: '%', precision: '2' }).toString());
const formatDayMonth = (value: Date): string => dayjs(value).format('D MMM');
const formatMonthYear = (value: Date): string => dayjs(value).format('MMM YYYY');

export { formatMoney, formatLargeMoney, formatLargeNumber, formatPercent, formatDayMonth, formatMonthYear };
