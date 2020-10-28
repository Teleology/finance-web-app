import * as React from 'react';
import { IconButton, Typography, TypographyProps } from '@material-ui/core';
import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon } from '@material-ui/icons';
import { branch, renderComponent } from 'recompose';
import styles from './read-more.styles';
type BaseProps = Omit<TypographyProps, 'children'> & { children: React.ReactText } & { delimiter?: number };
type Props = TypographyProps & { delimiter?: number };

const defaultDelimiter = 1000;
const ReadMoreTypographyBase: React.FC<BaseProps> = (props: BaseProps): React.ReactElement => {
  const { useIconStyles, useIconButtonStyles } = styles;
  const iconStyles = useIconStyles();
  const { children, delimiter = defaultDelimiter, ...typographyProps } = props;
  const [isFull, setIsFull] = React.useState(false);
  const toggleIsFull = React.useCallback(() => {
    setIsFull((isFull: boolean) => !isFull);
  }, [setIsFull]);
  return (
    <Typography {...typographyProps}>
      {isFull ? children : children.toString().substring(0, delimiter) + '...'}
      <IconButton onClick={toggleIsFull} classes={useIconButtonStyles()}>
        {isFull ? [' Less', <ArrowUpwardIcon classes={iconStyles} key={1} />] : [' More', <ArrowDownwardIcon classes={iconStyles} key={1} />]}
      </IconButton>
    </Typography>
  );
};

const ReadMoreTypography = branch(
  ({ children, delimiter = defaultDelimiter }: Props) => (typeof children === 'string' || typeof children === 'number') && (children + '').length > delimiter,
  renderComponent(ReadMoreTypographyBase)
)(Typography);

export { ReadMoreTypography };
