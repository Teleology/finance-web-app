import * as React from 'react';
import { Typography, styled, TypographyProps } from '@material-ui/core';

type AdditionProps = { children: number; format: (n: number) => string | React.ReactNode };
const FormattedTypography = (props: TypographyProps<'span', AdditionProps>): React.ReactElement => {
  const { children, format, ...rest } = props;
  return <Typography {...rest}>{format(children)}</Typography>;
};

const ColorfulFormattedTypography = styled(FormattedTypography)({
  color: (props: TypographyProps<'span', AdditionProps>) => (props.children > 0 ? 'green' : props.children < 0 ? 'red' : 'inherit')
});

export { FormattedTypography, ColorfulFormattedTypography };
