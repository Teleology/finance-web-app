import { makeStyles, StyleRules } from '@material-ui/core/styles';
import { SelectClassKey, TableContainerClassKey, TableRowClassKey } from '@material-ui/core';

// TODO: should be common styles ?
const useTableContainerStyles = makeStyles({
  root: {}
} as StyleRules<TableContainerClassKey>);

const useTableRowStyles = makeStyles({
  hover: {
    cursor: 'pointer'
  }
} as StyleRules<TableRowClassKey>);

const useSelectStyles = makeStyles({
  icon: {
    position: 'initial'
  }
} as StyleRules<SelectClassKey>);

export default { useTableContainerStyles, useTableRowStyles, useSelectStyles };
