import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { branch, renderComponent } from 'recompose';
import { get } from 'lodash/fp';
type Props = {
  icon: React.ReactElement;
  text: string;
  classes?: {
    root: string;
  };
};

const EmptyContent = (props: Props): React.ReactElement => {
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

const EmptyContentWrapper: React.ComponentClass<React.PropsWithChildren<Props & { isEmpty: boolean }>> = branch(
  get('isEmpty'),
  renderComponent(EmptyContent)
)(get('children'));

export { EmptyContent, EmptyContentWrapper };
