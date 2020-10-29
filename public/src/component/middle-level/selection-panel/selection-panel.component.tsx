import * as React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { connect } from 'react-redux';
import { map as _map, pick as _pick } from 'lodash';
import { companySelectionAction } from '../../../service/company-selection/company-selection.action';
import { RootState } from '../../../service/root-store';
import { LabelUnit } from '../../../utils/general-type';
import { CompanyInIndice } from '../../../service/company-selection/company-selection-utils';
import { sharedAction } from '../../../service/shared.action';
import styles from './selection-panel.styles';
const mapDispatch = { ...companySelectionAction, ..._pick(sharedAction, 'setCollection') };

const mapState = ({ companySelection: localState }: RootState) =>
  ({
    continent: localState.continent,
    country: localState.country,
    indice: localState.indice,
    companies: localState.companies
  } as const);

type Props = typeof mapDispatch & ReturnType<typeof mapState>;

// TODO: use virtualization for long list ?
const SelectionPanel = (props: Props): React.ReactElement => {
  const { getContinentOptions, continent, setContinentSelection, country, setCountrySelection, indice, setIndiceSelection, companies, setCollection } = props;
  const tableContainerStyles = styles.useTableContainerStyles();
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

  const handleRowClick = React.useCallback(() => {
    set;
  });
  // const setSelection4 = React.useCallback(
  //   (event: React.ChangeEvent<{ value: unknown }>) => {
  //     setCompanySelection(event.target.value as string);
  //   },
  //   [setCompanySelection]
  // );

  // TODO: repeated code
  return (
    <>
      <Grid spacing={2} container={true} direction="column">
        <Grid item={true}>
          <FormControl fullWidth={true}>
            <InputLabel>Continent</InputLabel>
            <Select value={continent.value} onChange={setSelection1} displayEmpty={false}>
              {_map(continent.options, (option: LabelUnit) => (
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
              {_map(country.options, (option: LabelUnit) => (
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
              {_map(indice.options, (option: LabelUnit) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/*<Grid item={true}>*/}
        {/*  <FormControl fullWidth={true}>*/}
        {/*    <InputLabel>Company</InputLabel>*/}
        {/*    <Select value={company.value} onChange={setSelection4} displayEmpty={true}>*/}
        {/*      {map(company.options, (option: LabelUnit, index: number) => (*/}
        {/*        <MenuItem value={option.value} key={`${option.value}-${index}`}>*/}
        {/*          {option.label}*/}
        {/*        </MenuItem>*/}
        {/*      ))}*/}
        {/*    </Select>*/}
        {/*  </FormControl>*/}
        {/*</Grid>*/}
        <Grid item={true}>
          <div
            onClick={(e) => {
              console.log(e.nativeEvent.target);
            }}
          >
            <TableContainer classes={tableContainerStyles}>
              <Table
                stickyHeader={true}
                onClick={(e) => {
                  console.log(e.nativeEvent.target.closest('tr').rowIndex);
                  console.log(e.nativeEvent.target);
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Short Name</TableCell>
                    <TableCell>Stock ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_map(companies, ({ name, country, shortName, stockId }: CompanyInIndice) => (
                    <TableRow data-info={22222} hover={true}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{shortName}</TableCell>
                      <TableCell>{country}</TableCell>
                      <TableCell>{stockId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

const SelectionPanelContainer = connect(mapState, mapDispatch)(SelectionPanel);

export { SelectionPanelContainer };
