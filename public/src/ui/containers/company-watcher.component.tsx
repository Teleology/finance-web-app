import * as React from 'react';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import { Add } from '@material-ui/icons';
const CompanyWatcher = (): React.ReactElement => (
  <Card>
    <CardHeader title="My Watch List" />
    <CardContent>
      <Button variant="contained" color="default" endIcon={<Add />}>
        Google
      </Button>
    </CardContent>
  </Card>
);

export { CompanyWatcher };
