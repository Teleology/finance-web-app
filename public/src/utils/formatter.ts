import { FormatSpecifier, format } from 'd3-format';

const formatMoney = format(new FormatSpecifier({ type: 's', trim: '~', symbol: '$' }).toString());
const formatLargeNumber = format(new FormatSpecifier({ comma: ',' }).toString());

export { formatMoney, formatLargeNumber };
