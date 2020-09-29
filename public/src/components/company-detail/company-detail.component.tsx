import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../service/root-store';

const mapState = ({ companyInfo }: RootState) =>
  ({
    detail: companyInfo.detail
  } as const);

type Props = ReturnType<typeof mapState>;

const CompanyDetail = ({ detail }: Props): React.ReactElement => (
  <div>
    <span>{JSON.stringify(detail)}</span>
  </div>
);

const CompanyDetailContainer = connect(mapState)(CompanyDetail);

export { CompanyDetailContainer };
