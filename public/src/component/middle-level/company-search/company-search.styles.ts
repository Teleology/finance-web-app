import { makeStyles, StyleRules } from '@material-ui/core/styles';
import { AutocompleteClassKey } from '@material-ui/lab';
const useAutoCompleteStyles = makeStyles({
  listbox: {
    padding: 0
  }
} as StyleRules<AutocompleteClassKey>);

export default {
  useAutoCompleteStyles
};
