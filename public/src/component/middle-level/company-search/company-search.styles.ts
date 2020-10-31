import { makeStyles, StyleRules } from '@material-ui/core/styles';
import { AutocompleteClassKey } from '@material-ui/lab';
import { TableContainerClassKey, TableRowClassKey } from '@material-ui/core';
const useAutoCompleteStyles = makeStyles({
  listbox: {
    padding: 0
  }
} as StyleRules<AutocompleteClassKey>);

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

export default { useAutoCompleteStyles, useTableContainerStyles, useTableRowStyles };
