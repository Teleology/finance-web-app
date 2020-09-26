import * as React from 'react';
import { Observable, combineLatest } from 'rxjs';
import { isEmpty, negate } from 'lodash/fp';
import { mergeMap, pluck, filter, debounceTime, startWith } from 'rxjs/operators';
import { useEventCallback } from 'rxjs-hooks';
import { TextField } from '@material-ui/core';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { LabelText } from '../utils/type-util';
import { baseURL } from '../../../express-server/src/common/network-utils';

// TODO: consider extraction
type Company = LabelText<string>;

// const CompanySearch = (): React.ReactElement => {
//   const [value, setValue] = React.useState<Company>({ value: 'a', label: 'labelA' });
//   const [options, setOptions] = React.useState<Array<Company>>([
//     { value: 'abc', label: 'abc' },
//     { value: 'bcd', label: 'bcd' },
//     { value: 'cdf', label: 'cdf' },
//     { value: 'dfe', label: 'dfe' }
//   ]);
//   const getOptionLabel = React.useCallback((company: Company) => company.label, []);
//   const getOptionSelected = React.useCallback((option: Company, value: Company) => option.value === value.value, []);
//   const renderInput = React.useCallback(
//     (params: AutocompleteRenderInputParams): React.ReactElement => <TextField {...params} label="Combo box" variant="outlined" />,
//     []
//   );
//
//   // const onChange = React.useCallback(
//   //   (event: React.ChangeEvent<HTMLInputElement>) => {
//   //     const { value } = event.target;
//   //     setValue(value);
//   //   },
//   //   [setValue]
//   // );
//   return <Autocomplete<Company> renderInput={renderInput} options={options} getOptionLabel={getOptionLabel} getOptionSelected={getOptionSelected} />;
// };
// const reducer = (input: string)
const CompanySearch = (): React.ReactElement => {
  const [changeCallBack, [value, options]] = useEventCallback(
    (event$: Observable<React.ChangeEvent<HTMLInputElement>>) => {
      const keyword$ = event$.pipe(pluck('target', 'value'));
      const response$ = keyword$.pipe(
        filter(negate(isEmpty)),
        debounceTime(1000),
        mergeMap((keywords: string) => ajax.getJSON(stringifyUrl({ url: `${baseURL}/search`, query: { keywords } }))),
        startWith([])
      );
      return combineLatest([keyword$, response$]);
    },
    ['', []]
  );

  return (
    <div>
      <p>{JSON.stringify(options)}</p>
      <TextField onChange={changeCallBack} value={value} />
    </div>
  );
};
export { CompanySearch };
