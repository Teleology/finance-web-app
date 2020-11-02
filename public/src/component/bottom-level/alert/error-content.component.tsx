import * as React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { startCase as _startCase } from 'lodash';
type Props = {
  severity: 'success' | 'info' | 'warning' | 'error';
  text: string;
  title?: string;
};

const AppAlert = (props: Props): React.ReactElement => {
  const { text, severity, title = _startCase(severity) } = props;
  return (
    <Alert severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {text}
    </Alert>
  );
};

export { AppAlert };
