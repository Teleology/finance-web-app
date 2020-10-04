import * as React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { companySelectionAction } from '../../../service/company-selection/company-selection.action';
import { RootState } from '../../../service/root-store';
import { LabelUnit } from '../../../utils/general-type';
const mapDispatch = companySelectionAction;

const mapState = ({ companySelection: localState }: RootState) =>
  ({
    continent: localState.continent,
    country: localState.country,
    indice: localState.indice,
    company: localState.company
  } as const);

type Props = typeof mapDispatch & ReturnType<typeof mapState>;

// TODO: use virtualization for long list ?
const SelectionPanel = (props: Props): React.ReactElement => {
  const {
    getContinentOptions,
    continent,
    setContinentSelection,
    country,
    setCountrySelection,
    indice,
    setIndiceSelection,
    company,
    setCompanySelection
  } = props;
  React.useEffect(() => {
    getContinentOptions();
  }, [getContinentOptions]);

  const setSelection1 = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setContinentSelection(event.target.value as string);
    },
    [setContinentSelection]
  );

  const setSelection2 = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setCountrySelection(event.target.value as string);
    },
    [setCountrySelection]
  );

  const setSelection3 = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setIndiceSelection(event.target.value as string);
    },
    [setIndiceSelection]
  );

  const setSelection4 = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setCompanySelection(event.target.value as string);
    },
    [setCompanySelection]
  );

  // TODO: repeated code
  return (
    <Grid spacing={2} container={true} item={true} direction="column" xs={4}>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <InputLabel>Continent</InputLabel>
          <Select value={continent.value} onChange={setSelection1} displayEmpty={false}>
            {map(continent.options, (option: LabelUnit) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <InputLabel>Country</InputLabel>
          <Select value={country.value} onChange={setSelection2} displayEmpty={true}>
            {map(country.options, (option: LabelUnit) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <InputLabel>Indice</InputLabel>
          <Select value={indice.value} onChange={setSelection3} displayEmpty={true}>
            {map(indice.options, (option: LabelUnit) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <InputLabel>Company</InputLabel>
          <Select value={company.value} onChange={setSelection4} displayEmpty={true}>
            {map(company.options, (option: LabelUnit, index: number) => (
              <MenuItem value={option.value} key={`${option.value}-${index}`}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const SelectionPanelContainer = connect(mapState, mapDispatch)(SelectionPanel);

export { SelectionPanelContainer };
