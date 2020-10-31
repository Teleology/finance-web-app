import * as React from 'react';
import { Observable } from 'rxjs';
import { isEmpty, negate } from 'lodash/fp';
import { pick as _pick, map as _map, isEmpty as _isEmpty } from 'lodash';
import { filter, debounce, map, switchMap } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { Description as DescriptionIcon } from '@material-ui/icons';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { connect } from 'react-redux';
import { baseURL } from '../../../../../express-server/src/common/network-utils';
import { sharedAction } from '../../../service/shared.action';
import { debounceWithEnterKey } from '../../../utils/stream';
import { companySearchAction } from '../../../service/company-search/company-search.action';
import { RootState } from '../../../service/root-store';
import { CompanyInSearch } from '../../../service/company-search/company-search-utils';
import { EmptyContentWrapper } from '../../bottom-level/empty-content/empty-content.component';
import { emptyIconProps } from '../../common-props';
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
  ..._pick<typeof sharedAction, 'setCollection'>(sharedAction, ['setCollection']),
  ..._pick<typeof companySearchAction, 'setMatches'>(companySearchAction, ['setMatches'])
};
const mapState = ({ companySearch }: RootState) =>
  ({
    matchedCompanies: companySearch.matches
  } as const);

type Props = ReturnType<typeof mapState> & typeof mapDispatch;

const CompanySearch = (props: Props): React.ReactElement => {
  const { setCollection, setMatches, matchedCompanies } = props;
  const tableContainerStyles = styles.useTableContainerStyles(),
    tableRowStyles = styles.useTableRowStyles();
  // TODO: persist search state
  const [input, setInput] = React.useState('');
  // const [selection, setSelection] = React.useState<Company | null>(null);
  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    [setInput]
  );
  // const onSelectionChange = React.useCallback(
  //   (event: object, value: Company | null): void => {
  //     setSelection(value);
  //     value !== null && setCollection({ label: value.name, value: value.symbol });
  //   },
  //   [setSelection, setCollection]
  // );
  const options = useObservable(
    (noUse: Observable<unknown>, input$: Observable<[string]>) => {
      const response$ = input$.pipe(
        map((input: [string]) => input[0]),
        filter(negate(isEmpty)),
        debounce(() => debounceWithEnterKey),
        switchMap((keywords: string) => ajax.getJSON<Array<Company>>(stringifyUrl({ url: `${baseURL}/search`, query: { keywords } })))
      );
      return response$;
    },
    [],
    [input]
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

      // TODO: branch
      const company = matchedCompanies!!![rowIndex - 1];
      setCollection({ value: company.symbol, label: company.name });
    },
    [matchedCompanies, setCollection]
  );

  // TODO: common empty icon styling ?
  return (
    <Grid container={true} direction="column" spacing={2}>
      <Grid item={true}>
        <TextField value={input} onChange={onChange} fullWidth={true} size="medium" margin="normal" />
      </Grid>
      <Grid item={true}>
        <EmptyContentWrapper
          icon={<DescriptionIcon {...emptyIconProps} />}
          text="Sorry, no companies found based on your current search"
          isEmpty={_isEmpty(matchedCompanies)}
        >
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
                {_map(matchedCompanies, ({ name, region, symbol, type }: CompanyInSearch) => (
                  <TableRow hover={true} classes={tableRowStyles}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{region}</TableCell>
                    <TableCell>{symbol}</TableCell>
                    <TableCell>{type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </EmptyContentWrapper>
      </Grid>
    </Grid>
  );
};
/**
 *   const getOptionLabel = React.useCallback((company: Company) => company.name, []);
 */
const CompanySearchContainer = connect(mapState, mapDispatch)(CompanySearch);
export { CompanySearchContainer };
