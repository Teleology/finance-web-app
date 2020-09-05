import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';

type TProps = { title: string; content: string };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const NewsSection = (props: TProps) => (
  <Grid direction="column">
    <Typography variant="h5">
      The tech giant, once an example of how not to operate in the nation’s capital, now has a successful influence operation there
    </Typography>
    <Typography variant="body1">
      SEATTLE — Microsoft’s quiet pursuit to buy TikTok suddenly appeared dead a month ago, when President Trump said he wanted to ban the popular social media
      app for national security reasons. So Brad Smith, the tech giant’s president, went to work.
    </Typography>
  </Grid>
);

export { NewsSection };
