import { makeStyles, StyleRules } from '@material-ui/core/styles';
import { TableContainerClassKey, TableRowClassKey } from '@material-ui/core';

// TODO: should be common styles ?
const useTableContainerStyles = makeStyles({
  root: {
    maxHeight: '50rem'
  }
} as StyleRules<TableContainerClassKey>);

const useTableRowStyles = makeStyles({
  hover: {
    cursor: 'pointer'
  }
} as StyleRules<TableRowClassKey>);
export default { useTableContainerStyles, useTableRowStyles };
