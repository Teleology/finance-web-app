import { RootAction } from '../root-store';
import { LabelText } from '../../utils/type-util';
import { CompanySelectionActionType } from './company-selection.action';
type CompanySelectionUnit = {
  value: string;
  options: Array<LabelText<string>>;
};

type CompanySelectionState = {
  continent: CompanySelectionUnit;
  country: CompanySelectionUnit;
  indice: CompanySelectionUnit;
  company: CompanySelectionUnit;
};

const defaultState = {
  continent: {
    value: '',
    options: []
  },
  country: {
    value: '',
    options: []
  },
  indice: {
    value: '',
    options: []
  },
  company: {
    value: '',
    options: []
  }
};
const companySelectionReducer = (prevState: CompanySelectionState = defaultState, action: RootAction): CompanySelectionState => {
  switch (action.type) {
    case CompanySelectionActionType.SET_CONTINENT_OPTIONS: {
      const prevContinentState = prevState.continent;
      // TODO: auto choose the first one
      const nextContinentState = { ...prevContinentState, options: action.payload.options };
      return {
        ...prevState,
        continent: nextContinentState
      };
    }

    case CompanySelectionActionType.SET_CONTINENT_SELECTION: {
      const prevContinentState = prevState.continent;
      const nextContinentState = { ...prevContinentState, value: action.payload.selection };
      return {
        ...prevState,
        continent: nextContinentState
      };
    }

    case CompanySelectionActionType.SET_COUNTRY_OPTIONS: {
      const prevCountryState = prevState.country;
      const nextCountryState = { ...prevCountryState, options: action.payload.options };
      return {
        ...prevState,
        country: nextCountryState
      };
    }

    case CompanySelectionActionType.SET_COUNTRY_SELECTION: {
      const prevCountryState = prevState.country;
      const nextCountryState: CompanySelectionUnit = { ...prevCountryState, value: action.payload.selection };
      return {
        ...prevState,
        country: nextCountryState
      };
    }

    case CompanySelectionActionType.RESET_COUNTRY: {
      return {
        ...prevState,
        country: defaultState.country
      };
    }

    case CompanySelectionActionType.SET_INDICE_OPTIONS: {
      const prevIndiceState = prevState.indice;
      const nextIndiceState = { ...prevIndiceState, options: action.payload.options };
      return {
        ...prevState,
        indice: nextIndiceState
      };
    }

    case CompanySelectionActionType.SET_INDICE_SELECTION: {
      const prevIndiceState = prevState.indice;
      const nextIndiceState: CompanySelectionUnit = { ...prevIndiceState, value: action.payload.selection };
      return {
        ...prevState,
        indice: nextIndiceState
      };
    }

    case CompanySelectionActionType.RESET_INDICE: {
      return {
        ...prevState,
        indice: defaultState.indice
      };
    }

    case CompanySelectionActionType.SET_COMPANY_OPTIONS: {
      const prevCompanyState = prevState.company;
      const nextCompanyState: CompanySelectionUnit = { ...prevCompanyState, options: action.payload.options };
      return {
        ...prevState,
        company: nextCompanyState
      };
    }

    case CompanySelectionActionType.SET_COMPANY_SELECTION: {
      const prevCompanyState = prevState.company;
      const nextCompanyState: CompanySelectionUnit = { ...prevCompanyState, value: action.payload.selection };
      return {
        ...prevState,
        company: nextCompanyState
      };
    }

    case CompanySelectionActionType.RESET_COMPANY: {
      return {
        ...prevState,
        company: defaultState.company
      };
    }

    default: {
      return prevState;
    }
  }
};

export { companySelectionReducer, CompanySelectionState, CompanySelectionUnit };
