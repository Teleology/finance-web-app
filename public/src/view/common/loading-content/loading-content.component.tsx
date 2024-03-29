import * as React from 'react';
import { CircularProgress, CircularProgressProps, Grid, Typography } from '@material-ui/core';
import { pick } from 'lodash';
import { isEmpty as fpIsEmpty } from 'lodash/fp';
import styles from './loading-content.styles';
type LoadingProps = CircularProgressProps;

type EmptyProps = {
  icon: React.ReactElement;
  text: string;
  classes?: {
    root: string;
  };
};

const EmptyContent = (props: EmptyProps): React.ReactElement => {
  const { icon, text, classes } = props;
  return (
    <Grid container={true} spacing={1} direction="column" alignItems="center" classes={{ root: classes?.root }}>
      <Grid item={true}>{icon}</Grid>
      <Grid item={true}>
        <Typography variant="h5" color="primary" align="center">
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

const LoadingContent = (props: LoadingProps): React.ReactElement => {
  const filteredProps = pick(props, ['color', 'disableShrink', 'size', 'thickness', 'value', 'variant']);
  return (
    <Grid container={true} justify="center" classes={styles.useGridStyles()}>
      <CircularProgress size={60} {...filteredProps} />
    </Grid>
  );
};

const Loader = <T, U extends T>(props: {
  data: T;
  children: (data: U) => React.ReactElement;
  load?: {
    on: boolean;
    props?: LoadingProps;
  };
  empty?: {
    on?: (data: T) => boolean;
    props: EmptyProps;
  };
}): React.ReactElement => {
  const { load, empty, data } = props;
  if (load !== undefined && load.on) {
    return <LoadingContent {...load.props} />;
  }
  if (empty !== undefined && (empty.on ?? fpIsEmpty)(data)) {
    return <EmptyContent {...empty.props} />;
  }
  return props.children(props.data as U);
};

export { LoadingContent, EmptyContent, Loader };
