import * as React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
// eslint-disable-next-line lodash-fp/use-fp
import { map } from 'lodash';
import { companySelectionAction } from '../../service/company-selection/company-selection.action';
import { RootState } from '../../service/root-store';
const mapDispatch = companySelectionAction;

const mapState = ({ companySelection: localState }: RootState) =>
  ({
    continent: localState.continent,
    country: localState.country,
    indice: localState.indice,
    company: localState.company
  } as const);

type Props = typeof mapDispatch & ReturnType<typeof mapState>;

const SelectionPanel = (props: Props): React.ReactElement => {
  const { getContinentOptions, continent, setContinentSelection, country, setCountrySelection } = props;
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

  return (
    <Grid spacing={2} container={true} item={true} direction="column" xs={4}>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <InputLabel>Age</InputLabel>
          <Select value={continent.value} onChange={setSelection1} displayEmpty={false}>
            {map(continent.options, (option: string) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <InputLabel>Country</InputLabel>
          <Select value={country.value} onChange={setSelection2} displayEmpty={true}>
            {map(country.options, (option: string) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item={true}>
        <FormControl fullWidth={true}>
          <InputLabel>Age</InputLabel>
          <Select value={10} onChange={console.log} displayEmpty={true}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const SelectionPanelContainer = connect(mapState, mapDispatch)(SelectionPanel);

export { SelectionPanelContainer };
