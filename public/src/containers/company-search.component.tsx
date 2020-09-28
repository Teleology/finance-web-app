import * as React from 'react';
import { Observable } from 'rxjs';
import { isEmpty, negate } from 'lodash/fp';
import { pick } from 'lodash';
import { filter, debounce, map, switchMap } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { TextField } from '@material-ui/core';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { connect } from 'react-redux';
import { baseURL } from '../../../express-server/src/common/network-utils';
import { sharedAction } from '../service/shared.action';
import { debounceWithEnterKey } from '../utils/stream';

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

const mapDispatch = pick<typeof sharedAction, 'setCollection'>(sharedAction, ['setCollection']);
type Props = typeof mapDispatch;
const CompanySearch = ({ setCollection }: Props): React.ReactElement => {
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

  const getOptionLabel = React.useCallback((company: Company) => company.name, []);
  const getOptionSelected = React.useCallback((option: Company, value: Company) => option.symbol === value.symbol, []);
  const renderInput = React.useCallback(
    (params: AutocompleteRenderInputParams): React.ReactElement => <TextField {...params} label="Combo box" variant="outlined" />,
    []
  );

  return (
    <Autocomplete<Company>
      renderInput={renderInput}
      options={options}
      value={selection}
      onChange={onSelectionChange}
      inputValue={input}
      onInputChange={onInputChange}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
    />
  );
};

const CompanySearchContainer = connect(null, mapDispatch)(CompanySearch);
export { CompanySearchContainer };
