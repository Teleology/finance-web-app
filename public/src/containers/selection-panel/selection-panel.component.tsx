import * as React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { companySelectionAction } from '../../service/company-selection/company-selection.action';
const mapDispatch = companySelectionAction;

type Props = typeof mapDispatch;

const SelectionPanel = (props: Props): React.ReactElement => {
  const { getContinentOptions } = props;
  React.useEffect(() => {
    getContinentOptions();
  }, [getContinentOptions]);
  return (
    <Grid spacing={2} container={true} item={true} direction="column" xs={4}>
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

const SelectionPanelContainer = connect(undefined, mapDispatch)(SelectionPanel);

export { SelectionPanelContainer };
