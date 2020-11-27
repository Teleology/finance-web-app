import * as React from 'react';
import { flow } from 'lodash/fp';
import { Typography, styled, TypographyProps, fade, darken } from '@material-ui/core';
import { getContrastColor } from '../../../utils/calculation';

type AdditionProps = { children: number; format: (n: number) => string | React.ReactNode };

const getColorBasedOnProps = (props: TypographyProps<'span', AdditionProps> & { tint: string }): string =>
  props.children > 0 ? props.tint : props.children < 0 ? getContrastColor(props.tint) : 'inherit';

const FormattedTypography = (props: TypographyProps<'span', AdditionProps>): React.ReactElement => {
  const { children, format, ...rest } = props;
  return <Typography {...rest}>{format(children)}</Typography>;
};

const ColorfulFormattedTypography = styled(FormattedTypography)({
  color: getColorBasedOnProps
});

const BackgroundColorfulFormattedTypography = styled(ColorfulFormattedTypography)({
  backgroundColor: flow(getColorBasedOnProps, (color: string) => fade(color, 0.2))
});
export { FormattedTypography, ColorfulFormattedTypography, BackgroundColorfulFormattedTypography };
