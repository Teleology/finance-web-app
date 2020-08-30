import * as React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

type Prop = {};
const SelectionPanel = (): React.ReactElement => (
  <Grid spacing={2} container={true} direction="column" xs={1}>
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

export { SelectionPanel };