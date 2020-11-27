import { FormatSpecifier, format } from 'd3-format';
import * as dayjs from 'dayjs';

const formatWithSign = format(new FormatSpecifier({ sign: '+' }).toString());

const formatMoney = format(new FormatSpecifier({ symbol: '$' }).toString());
const formatLargeMoney = format(new FormatSpecifier({ type: 's', trim: '~', symbol: '$' }).toString());

const formatLargeNumber = format(new FormatSpecifier({ comma: ',' }).toString());

const formatPercentChange = format(new FormatSpecifier({ type: '%', precision: '2', sign: '+' }).toString());

const formatDayMonth = (value: Date): string => dayjs(value).format('D MMM');
const formatMonthYear = (value: Date): string => dayjs(value).format('MMM YYYY');

export { formatWithSign, formatMoney, formatLargeMoney, formatLargeNumber, formatPercentChange, formatDayMonth, formatMonthYear };
