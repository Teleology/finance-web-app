import * as React from 'react';
import { IconButton, Typography, TypographyProps } from '@material-ui/core';
import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon } from '@material-ui/icons';
import styles from './read-more.styles';
// TODO: overrride type utility
type Props = Omit<TypographyProps, 'children'> & { children: string | number } & { delimiter?: number };
// const ReadMoreTypography = branch<Props, Props>(
//   ({ children }: Props) => (typeof children === 'string' || children === 'number') && (children + '').length > 500,
//   ({ children, ...rest }: Props) => <Typography {...rest}>{children}</Typography>
// )(Typography);

// TODO: default typography
const ReadMoreTypography: React.FC<Props> = (props: Props): React.ReactElement => {
  const { useIconStyles, useIconButtonStyles } = styles;
  const iconStyles = useIconStyles();
  const { children, delimiter, ...typographyProps } = props;
  const [isFull, setIsFull] = React.useState(false);
  const toggleIsFull = React.useCallback(() => {
    setIsFull((isFull: boolean) => !isFull);
  }, [setIsFull]);
  return (
    <Typography {...typographyProps}>
      {isFull ? children : children.toString().substring(0, delimiter) + '...'}
      <IconButton onClick={toggleIsFull} classes={useIconButtonStyles()}>
        {isFull ? <ArrowUpwardIcon classes={iconStyles} /> : <ArrowDownwardIcon classes={iconStyles} />}
      </IconButton>
    </Typography>
  );
};
ReadMoreTypography.defaultProps = {
  delimiter: 500
};
export { ReadMoreTypography };
