import { RootAction } from '../root-store';
import { CompanySelectionActionType } from './company-selection.action';
type CompanySelectionUnit = {
  value: string | null;
  options: Array<string>;
};

type CompanySelectionState = {
  continent: CompanySelectionUnit;
  country: CompanySelectionUnit;
  indice: CompanySelectionUnit;
  company: CompanySelectionUnit;
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
    case CompanySelectionActionType.SET_CONTINENT_OPTIONS: {
      const prevContinentState = prevState.continent;
      const nextContinentState = { ...prevContinentState, options: action.payload.options, value: prevContinentState.value ?? action.payload.options[0] };
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
      const nextCountryState = { ...prevCountryState, selection: action.payload.selection };
      return {
        ...prevState,
        country: nextCountryState
      };
    }

    case CompanySelectionActionType.SET_INDICE_OPTIONS: {
      const prevIndiceState = prevState.continent;
      const nextIndiceState = { ...prevIndiceState, options: action.payload.options };
      return {
        ...prevState,
        indice: nextIndiceState
      };
    }

    case CompanySelectionActionType.SET_INDICE_SELECTION: {
      const prevIndiceState = prevState.continent;
      const nextIndiceState = { ...prevIndiceState, selection: action.payload.selection };
      return {
        ...prevState,
        indice: nextIndiceState
      };
    }

    default: {
      return prevState;
    }
  }
};

export { companySelectionReducer, CompanySelectionState, CompanySelectionUnit };
