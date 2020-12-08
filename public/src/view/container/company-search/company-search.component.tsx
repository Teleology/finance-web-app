import * as React from 'react';
import { Observable, of } from 'rxjs';
import { isEmpty as fpIsEmpty, negate as fpNegate } from 'lodash/fp';
import { pick as _pick, map as _map } from 'lodash';
import { filter, debounce, map, switchMap, pluck, tap, catchError } from 'rxjs/operators';
import { useEventCallback, useObservable } from 'rxjs-hooks';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { Description as DescriptionIcon } from '@material-ui/icons';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { connect } from 'react-redux';
import { baseURL } from '../../../../../express-server/src/common/network-utils';
import { debounceWithEnterKey } from '../../../utils/stream';
import { companySearchAction } from '../../../service/company-search/company-search.action';
import { RootState } from '../../../service/root-store';
import { CompanyInSearch } from '../../../service/company-search/company-search-utils';
import { emptyIconProps } from '../../common-props';
import { Loader } from '../../common/loading-content/loading-content.component';
import { companyInfoAction } from '../../../service/company-info/company-info.action';
import styles from './company-search.styles';
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

const mapDispatch = {
  ..._pick<typeof companyInfoAction, 'getDetail'>(companyInfoAction, ['getDetail']),
  ..._pick<typeof companySearchAction, 'setMatches'>(companySearchAction, ['setMatches'])
};
const mapState = ({ companySearch }: RootState) =>
  ({
    matchedCompanies: companySearch.matches
  } as const);

type Props = ReturnType<typeof mapState> & typeof mapDispatch;

const CompanySearch = (props: Props): React.ReactElement => {
  const { getDetail, setMatches, matchedCompanies } = props;
  const tableContainerStyles = styles.useTableContainerStyles(),
    tableRowStyles = styles.useTableRowStyles();
  const [isLoading, setIsLoading] = React.useState(false);

  // const [input, setInput] = React.useState('');
  // const [selection, setSelection] = React.useState<Company | null>(null);
  // const onChange = React.useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setInput(event.target.value);
  //   },
  //   [setInput]
  // );
  // const onSelectionChange = React.useCallback(
  //   (event: object, value: Company | null): void => {
  //     setSelection(value);
  //     value !== null && setCollection({ label: value.name, value: value.symbol });
  //   },
  //   [setSelection, setCollection]
  // );
  const [handleTextChange, value] = useEventCallback<React.ChangeEvent<HTMLInputElement>, string>(
    (event$: Observable<React.ChangeEvent<HTMLInputElement>>): Observable<string> => event$.pipe(pluck('target', 'value')),
    ''
  );
  const options = useObservable(
    (noUse: Observable<unknown>, input$: Observable<[string]>) => {
      const response$ = input$.pipe(
        map((input: [string]) => input[0]),
        filter(fpNegate(fpIsEmpty)),
        debounce(() => debounceWithEnterKey),
        tap(() => {
          setIsLoading(true);
        }),
        switchMap((keywords: string) => ajax.getJSON<Array<Company>>(stringifyUrl({ url: `${baseURL}/search`, query: { keywords } }))),
        catchError((error: Error) => {
          console.log(error);
          return of([]);
        }),
        tap(() => {
          setIsLoading(false);
        })
      );
      return response$;
    },
    [],
    [value]
  );

  React.useEffect(() => {
    setMatches(options);
  }, [options, setMatches]);

  const handleTableClick = React.useCallback(
    (e: React.MouseEvent) => {
      const rowIndex = (e.nativeEvent.target as Element)?.closest('tr')?.rowIndex;
      if (rowIndex == null) {
        return;
      }

      const company = matchedCompanies[rowIndex - 1];
      getDetail({ value: company.symbol, label: company.name });
    },
    [matchedCompanies, getDetail]
  );

  return (
    <Grid container={true} direction="column" spacing={2}>
      <Grid item={true}>
        <TextField value={value} onChange={handleTextChange} fullWidth={true} size="medium" margin="normal" />
      </Grid>
      <Grid item={true}>
        <Loader
          data={matchedCompanies}
          load={{ on: isLoading }}
          empty={{ on: fpIsEmpty, props: { icon: <DescriptionIcon {...emptyIconProps} />, text: 'Sorry, no companies found based on your current search' } }}
        >
          {(data: Array<CompanyInSearch>): React.ReactElement => (
            <TableContainer classes={tableContainerStyles}>
              <Table stickyHeader={true} onClick={handleTableClick}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Region</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_map(data, ({ name, region, symbol, type }: CompanyInSearch) => (
                    <TableRow hover={true} classes={tableRowStyles} key={symbol}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{region}</TableCell>
                      <TableCell>{symbol}</TableCell>
                      <TableCell>{type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Loader>
      </Grid>
    </Grid>
  );
};
/**
 *   const getOptionLabel = React.useCallback((company: Company) => company.name, []);
 */
const CompanySearchContainer = connect(mapState, mapDispatch)(CompanySearch);
export { CompanySearchContainer };
