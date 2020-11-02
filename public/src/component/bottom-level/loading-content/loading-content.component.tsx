import * as React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { branch, renderComponent } from 'recompose';
import { get } from 'lodash/fp';
import styles from './loading-content.styles';

type Props = {
  isLoading: boolean;
};

const LoadingContentWrapper: React.ComponentClass<React.PropsWithChildren<Props>> = branch(
  get('isLoading'),
  renderComponent(() => (
    <Grid container={true} justify="center" classes={styles.useGridStyles()}>
      <CircularProgress size={60} />
    </Grid>
  ))
)(get('children'));

export { LoadingContentWrapper };
