import * as React from 'react';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { get } from 'lodash/fp';
import { noop } from 'lodash';
import { fromEventPattern } from 'rxjs';
import { LabelText } from '../utils/type-util';

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

const CompanySearch = (): React.ReactElement => {
  let myHandler = noop;

  const stream$ = fromEventPattern((handler) => {
    myHandler = handler;
  });

  stream$.subscribe(console.log);

  return <TextField onChange={myHandler} defaultValue={'default value'} />;
};

export { CompanySearch };
