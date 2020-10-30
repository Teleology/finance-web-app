import * as React from 'react';
import { Observable } from 'rxjs';
import { isEmpty, negate } from 'lodash/fp';
import { pick as _pick, map as _map } from 'lodash';
import { filter, debounce, map, switchMap } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { connect } from 'react-redux';
import { baseURL } from '../../../../../express-server/src/common/network-utils';
import { sharedAction } from '../../../service/shared.action';
import { debounceWithEnterKey } from '../../../utils/stream';
import { companySearchAction } from '../../../service/company-search/company-search.action';
import { RootState } from '../../../service/root-store';
import { CompanyInSearch } from '../../../service/company-search/company-search-utils';
import styles from './company-search.styles';
type Company = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
};

const mapDispatch = {
  ..._pick<typeof sharedAction, 'setCollection'>(sharedAction, ['setCollection']),
  ..._pick<typeof companySearchAction, 'setMatches'>(companySearchAction, ['setMatches'])
};
const mapState = ({ companySearch }: RootState) =>
  ({
    matchedCompanies: companySearch.matches
  } as const);

type Props = ReturnType<typeof mapState> & typeof mapDispatch;

const CompanySearch = (props: Props): React.ReactElement => {
  const { setCollection, setMatches, matchedCompanies } = props;
  const { useAutoCompleteStyles } = styles;
  const [input, setInput] = React.useState('');
  const [selection, setSelection] = React.useState<Company | null>(null);
  const onInputChange = React.useCallback(
    (event: object, value: string) => {
      setInput(value);
    },
    [setInput]
  );
  const onSelectionChange = React.useCallback(
    (event: object, value: Company | null): void => {
      setSelection(value);
      value !== null && setCollection({ label: value.name, value: value.symbol });
    },
    [setSelection, setCollection]
  );
  const options = useObservable(
    (noUse: Observable<unknown>, input$: Observable<[string]>) => {
      const response$ = input$.pipe(
        map((input: [string]) => input[0]),
        filter(negate(isEmpty)),
        debounce(() => debounceWithEnterKey),
        switchMap((keywords: string) => ajax.getJSON<Array<Company>>(stringifyUrl({ url: `${baseURL}/search`, query: { keywords } })))
      );
      return response$;
    },
    [],
    [input]
  );

  React.useEffect(() => {
    setMatches(options);
  }, [options, setMatches]);

  const getOptionLabel = React.useCallback((company: Company) => company.name, []);
  const getOptionSelected = React.useCallback((option: Company, value: Company) => option.symbol === value.symbol, []);
  const renderInput = React.useCallback((params: AutocompleteRenderInputParams): React.ReactElement => <TextField {...params} />, []);

  return (
    <Grid container={true} direction="column" spacing={2}>
      <Grid item={true}>
        <Autocomplete<Company>
          renderInput={renderInput}
          options={options}
          value={selection}
          onChange={onSelectionChange}
          inputValue={input}
          onInputChange={onInputChange}
          getOptionLabel={getOptionLabel}
          getOptionSelected={getOptionSelected}
          fullWidth={true}
          classes={useAutoCompleteStyles()}
        />
      </Grid>
      <Grid item={true}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_map(matchedCompanies, ({ name, region, symbol, type }: CompanyInSearch) => (
              <TableRow hover={true}>
                <TableCell>{name}</TableCell>
                <TableCell>{region}</TableCell>
                <TableCell>{symbol}</TableCell>
                <TableCell>{type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

const CompanySearchContainer = connect(mapState, mapDispatch)(CompanySearch);
export { CompanySearchContainer };
