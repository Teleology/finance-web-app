import { RootAction } from '../root-store';
import { LabelText } from '../../utils/type-util';
import { FetchStatusEnum } from '../../utils/network-util';
import { CompanySelectionActionType } from './company-selection.action';
import { CompanyInIndice } from './company-selection-utils';

type CompanySelectionUnit = {
  value: string;
  options: Array<LabelText<string>>;
  fetchStatus: FetchStatusEnum;
};

type CompanySelectionState = {
  continent: CompanySelectionUnit;
  country: CompanySelectionUnit;
  indice: CompanySelectionUnit;
  company: {
    list: Array<CompanyInIndice>;
    fetchStatus: FetchStatusEnum;
  };
};

const defaultState: CompanySelectionState = {
  continent: {
    value: '',
    options: [],
    fetchStatus: FetchStatusEnum.NEVER
  },
  country: {
    value: '',
    options: [],
    fetchStatus: FetchStatusEnum.NEVER
  },
  indice: {
    value: '',
    options: [],
    fetchStatus: FetchStatusEnum.NEVER
  },
  company: {
    list: [],
    fetchStatus: FetchStatusEnum.NEVER
  }
};
const companySelectionReducer = (prevState: CompanySelectionState = defaultState, action: RootAction): CompanySelectionState => {
  switch (action.type) {
    case CompanySelectionActionType.GET_CONTINENT_OPTIONS: {
      return {
        ...prevState,
        continent: {
          ...prevState.continent,
          fetchStatus: FetchStatusEnum.PENDING
        }
      };
    }

    case CompanySelectionActionType.GET_CONTINENT_OPTIONS_FAILURE: {
      return {
        ...prevState,
        continent: {
          ...prevState.continent,
          fetchStatus: FetchStatusEnum.FAIL
        }
      };
    }
    case CompanySelectionActionType.SET_CONTINENT_OPTIONS: {
      const prevContinentState = prevState.continent;
      // TODO: auto choose the first one
      const nextContinentState = { ...prevContinentState, fetchStatus: FetchStatusEnum.SUCCESS, options: action.payload.options };
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
        continent: nextContinentState,
        country: {
          ...prevState.country,
          fetchStatus: FetchStatusEnum.PENDING
        }
      };
    }

    case CompanySelectionActionType.GET_COUNTRY_OPTIONS_FAILURE: {
      return {
        ...prevState,
        country: {
          ...prevState.country,
          fetchStatus: FetchStatusEnum.FAIL
        }
      };
    }

    case CompanySelectionActionType.SET_COUNTRY_OPTIONS: {
      const prevCountryState = prevState.country;
      const nextCountryState = { ...prevCountryState, options: action.payload.options, fetchStatus: FetchStatusEnum.SUCCESS };
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
        country: nextCountryState,
        indice: {
          ...prevState.indice,
          fetchStatus: FetchStatusEnum.PENDING
        }
      };
    }

    case CompanySelectionActionType.RESET_COUNTRY: {
      return {
        ...prevState,
        country: defaultState.country
      };
    }

    case CompanySelectionActionType.GET_INDICE_OPTIONS_FAILURE: {
      return {
        ...prevState,
        indice: {
          ...prevState.indice,
          fetchStatus: FetchStatusEnum.FAIL
        }
      };
    }

    case CompanySelectionActionType.SET_INDICE_OPTIONS: {
      const prevIndiceState = prevState.indice;
      const nextIndiceState = { ...prevIndiceState, options: action.payload.options, fetchStatus: FetchStatusEnum.SUCCESS };
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
        indice: nextIndiceState,
        company: {
          ...prevState.company,
          fetchStatus: FetchStatusEnum.PENDING
        }
      };
    }

    case CompanySelectionActionType.RESET_INDICE: {
      return {
        ...prevState,
        indice: defaultState.indice
      };
    }

    case CompanySelectionActionType.GET_COMPANY_IN_INDICE_FAILURE: {
      return {
        ...prevState,
        company: {
          ...prevState.company,
          fetchStatus: FetchStatusEnum.FAIL
        }
      };
    }

    case CompanySelectionActionType.SET_COMPANY_IN_INDICE: {
      return {
        ...prevState,
        company: {
          list: action.payload.companies,
          fetchStatus: FetchStatusEnum.SUCCESS
        }
      };
    }

    case CompanySelectionActionType.RESET_COMPANY_IN_INDICE: {
      return {
        ...prevState,
        company: defaultState.company
      };
    }
    // case CompanySelectionActionType.SET_COMPANY_OPTIONS: {
    //   const prevCompanyState = prevState.company;
    //   const nextCompanyState: CompanySelectionUnit = { ...prevCompanyState, options: action.payload.options };
    //   return {
    //     ...prevState,
    //     company: nextCompanyState
    //   };
    // }
    //
    // case CompanySelectionActionType.SET_COMPANY_SELECTION: {
    //   const prevCompanyState = prevState.company;
    //   const nextCompanyState: CompanySelectionUnit = { ...prevCompanyState, value: action.payload.selection };
    //   return {
    //     ...prevState,
    //     company: nextCompanyState
    //   };
    // }
    //
    // case CompanySelectionActionType.RESET_COMPANY: {
    //   return {
    //     ...prevState,
    //     company: defaultState.company
    //   };
    // }

    default: {
      return prevState;
    }
  }
};

export { companySelectionReducer, CompanySelectionState, CompanySelectionUnit };
