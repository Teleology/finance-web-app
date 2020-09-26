import * as React from 'react';
import { Observable, combineLatest } from 'rxjs';
import { isEmpty, negate } from 'lodash/fp';
import { mergeMap, pluck, filter, debounceTime, startWith, map } from 'rxjs/operators';
import { useEventCallback, useObservable } from 'rxjs-hooks';
import { TextField } from '@material-ui/core';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { LabelText } from '../utils/type-util';
import { baseURL } from '../../../express-server/src/common/network-utils';

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

const CompanySearch = (): React.ReactElement => {
  const [input, setInput] = React.useState('');
  const onInputChange = React.useCallback(
    (event: object, value: string) => {
      setInput(value);
    },
    [setInput]
  );
  const options = useObservable(
    (noUse: Observable<unknown>, input$: Observable<[string]>) => {
      const response$ = input$.pipe(
        map((input: [string]) => input[0]),
        filter(negate(isEmpty)),
        debounceTime(1000),
        mergeMap((keywords: string) => ajax.getJSON<Array<Company>>(stringifyUrl({ url: `${baseURL}/search`, query: { keywords } })))
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
      onInputChange={onInputChange}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
    />
  );
};
export { CompanySearch };
