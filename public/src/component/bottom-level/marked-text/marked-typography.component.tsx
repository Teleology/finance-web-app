import * as React from 'react';
import { Typography, styled, TypographyTypeMap, TypographyProps } from '@material-ui/core';

const FormattedTypography = (props: TypographyProps<'span', { children: number; format: (n: number) => string }>): React.ReactElement => {
  const { children, format, ...rest } = props;
  return <Typography {...rest}>{format(children)}</Typography>;
};

const ColorTypography = styled(Typography)({
  color: (props: { children: number }) => (props.children > 0 ? 'green' : props.children < 0 ? 'red' : 'inherit')
});

export { FormattedTypography };
