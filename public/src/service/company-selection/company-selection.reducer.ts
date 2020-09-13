import { RootAction, RootState } from '../root-store';

type SelectionUnit = {
  value: string | null;
  options: Array<string>;
};

type CompanySelectionState = {
  continent: SelectionUnit;
  country: SelectionUnit;
  indice: SelectionUnit;
  company: SelectionUnit;
};

const companySelectionDefaultState = {
  continent: {
    value: null,
    options: []
  },
  country: {
    value: null,
    options: []
  },
  indice: {
    value: null,
    options: []
  },
  company: {
    value: null,
    options: []
  }
};
const companySelectionReducer = (prevState: CompanySelectionState = companySelectionDefaultState, action: RootAction): CompanySelectionState => {
  switch (action.type) {
    case
    default: {
      return prevState;
    }
  }
};

export { companySelectionReducer };
