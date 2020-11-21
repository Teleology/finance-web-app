import { FormatSpecifier, format } from 'd3-format';
import * as dayjs from 'dayjs';

const formatMoney = format(new FormatSpecifier({ type: 's', trim: '~', symbol: '$' }).toString());
const formatLargeNumber = format(new FormatSpecifier({ comma: ',' }).toString());

const formatDayMonth = (value: Date): string => dayjs(value).format('D MMM');
const formatMonthYear = (value: Date): string => dayjs(value).format('MMM YYYY');

export { formatMoney, formatLargeNumber, formatDayMonth, formatMonthYear };
