import { makeStyles, StyleRules } from '@material-ui/core/styles';
import { TableContainerClassKey } from '@material-ui/core';

const useTableContainerStyles = makeStyles({
  root: {
    maxHeight: '50rem'
  }
} as StyleRules<TableContainerClassKey>);

export default { useTableContainerStyles };
