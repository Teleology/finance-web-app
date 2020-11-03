import * as React from 'react';
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { ArrowDropDown as ArrowDropDownIcon, Description as DescriptionIcon, ErrorOutline as ErrorOutlineIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { isEmpty as _isEmpty, map as _map, pick as _pick } from 'lodash';
import { companySelectionAction } from '../../../service/company-selection/company-selection.action';
import { RootState } from '../../../service/root-store';
import { LabelUnit } from '../../../utils/general-type';
import { CompanyInIndice } from '../../../service/company-selection/company-selection-utils';
import { sharedAction } from '../../../service/shared.action';
import { EmptyContentWrapper } from '../../bottom-level/empty-content/empty-content.component';
import { emptyIconProps } from '../../common-props';
import { FetchStatusEnum } from '../../../utils/network-util';
import styles from './selection-panel.styles';

const mapDispatch = { ...companySelectionAction, ..._pick(sharedAction, 'setCollection') };

// TODO: eslint no unused imports
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
  const tableContainerStyles = styles.useTableContainerStyles(),
    tableRowStyles = styles.useTableRowStyles(),
    selectionStyles = styles.useSelectStyles();

  React.useEffect(() => {
    getContinentOptions();
  }, [getContinentOptions]);

  const getSelectionIcon = React.useCallback((fetchStatus: FetchStatusEnum): React.ElementType => {
    if (fetchStatus === FetchStatusEnum.SUCCESS) {
      return ArrowDropDownIcon;
    } else if (fetchStatus === FetchStatusEnum.FAIL) {
      return ErrorOutlineIcon;
    } else if (fetchStatus === FetchStatusEnum.PENDING) {
      // eslint-disable-next-line react/display-name
      return (): React.ReactElement => <CircularProgress color="primary" size="2rem" />;
    } else {
      // eslint-disable-next-line react/display-name
      return (): React.ReactElement => <></>;
    }
  }, []);
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

  // TODO: repeated code
  const handleTableClick = React.useCallback(
    (e: React.MouseEvent) => {
      const rowIndex = (e.nativeEvent.target as Element)?.closest('tr')?.rowIndex;
      if (rowIndex == null) {
        return;
      }
      const company = companies[rowIndex - 1];
      setCollection({ value: company.shortName, label: company.name });
    },
    [companies, setCollection]
  );

  // TODO: repeated code
  return (
    <>
      <Grid spacing={2} container={true} direction="column">
        <Grid item={true}>
          <FormControl fullWidth={true}>
            <InputLabel>Continent</InputLabel>
            <Select
              value={continent.value}
              onChange={setSelection1}
              displayEmpty={false}
              classes={selectionStyles}
              IconComponent={getSelectionIcon(continent.fetchStatus)}
            >
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
            <Select
              value={country.value}
              onChange={setSelection2}
              displayEmpty={false}
              classes={selectionStyles}
              IconComponent={getSelectionIcon(country.fetchStatus)}
            >
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
            <Select
              value={indice.value}
              onChange={setSelection3}
              displayEmpty={false}
              classes={selectionStyles}
              IconComponent={getSelectionIcon(indice.fetchStatus)}
            >
              {_map(indice.options, (option: LabelUnit) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true}>
          <EmptyContentWrapper icon={<DescriptionIcon {...emptyIconProps} />} text="Please complete all selections" isEmpty={_isEmpty(companies)}>
            <TableContainer classes={tableContainerStyles}>
              <Table stickyHeader={true} onClick={handleTableClick}>
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
                    <TableRow hover={true} classes={tableRowStyles} key={stockId}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{shortName}</TableCell>
                      <TableCell>{country}</TableCell>
                      <TableCell>{stockId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </EmptyContentWrapper>
        </Grid>
      </Grid>
    </>
  );
};

const SelectionPanelContainer = connect(mapState, mapDispatch)(SelectionPanel);

export { SelectionPanelContainer };
/**
 *   const setSelection4 = React.useCallback(
 (event: React.ChangeEvent<{ value: unknown }>) => {
      setCompanySelection(event.target.value as string);
    },
 [setCompanySelection]
 );
 */
/*
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
 */
