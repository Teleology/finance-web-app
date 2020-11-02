import { ReturnTypeOfGroup } from '../../utils/type-util';
import { LabelUnit } from '../../utils/general-type';
import { CompanyInIndice } from './company-selection-utils';

// TODO: prefix should be const
namespace CompanySelectionActionType {
  export const GET_CONTINENT_OPTIONS = 'company-selection/GET_CONTINENT_OPTIONS';
  export const GET_CONTINENT_OPTIONS_FAILURE = 'company-selection/GET_CONTINENT_OPTIONS_FAILURE';
  export const SET_CONTINENT_OPTIONS = 'company-selection/SET_CONTINENT_OPTIONS';
  export const SET_CONTINENT_SELECTION = 'company-selection/SET_CONTINENT_SELECTION';
  export const SET_COUNTRY_OPTIONS = 'company-selection/SET_COUNTRY_OPTIONS';
  export const SET_COUNTRY_SELECTION = 'company-selection/SET_COUNTRY_SELECTION';
  export const RESET_COUNTRY = 'company-selection/RESET_COUNTRY';
  export const SET_INDICE_OPTIONS = 'company-selection/SET_INDICE_OPTIONS';
  export const SET_INDICE_SELECTION = 'company-selection/SET_INDICE_SELECTION';
  export const RESET_INDICE = 'company-selectioin/RESET_INDICE';
  export const SET_COMPANY_IN_INDICE = 'company-selectioin/SET_COMPANY_IN_INDICE';
  export const RESET_COMPANY_IN_INDICE = 'company-selectioin/RESET_COMPANY_IN_INDICE';
  // export const SET_COMPANY_OPTIONS = 'company-selection/SET_COMPANY_OPTIONS';
  // export const SET_COMPANY_SELECTION = 'company-selection/SET_COMPANY_SELECTION';
  // export const RESET_COMPANY = 'company-selection/RESET_COMPANY';
}
const getContinentOptions = () =>
  ({
    type: CompanySelectionActionType.GET_CONTINENT_OPTIONS
  } as const);

const getContinentOptionsFailure = () => ({
  type: CompanySelectionActionType.GET_CONTINENT_OPTIONS_FAILURE
} as const);

const setContinentOptions = (options: Array<LabelUnit>) =>
  ({
    type: CompanySelectionActionType.SET_CONTINENT_OPTIONS,
    payload: { options }
  } as const);

const setContinentSelection = (selection: string) =>
  ({
    type: CompanySelectionActionType.SET_CONTINENT_SELECTION,
    payload: { selection }
  } as const);

const setCountryOptions = (options: Array<LabelUnit>) =>
  ({
    type: CompanySelectionActionType.SET_COUNTRY_OPTIONS,
    payload: { options }
  } as const);

const setCountrySelection = (selection: string) =>
  ({
    type: CompanySelectionActionType.SET_COUNTRY_SELECTION,
    payload: { selection }
  } as const);

const resetCountry = () =>
  ({
    type: CompanySelectionActionType.RESET_COUNTRY
  } as const);

const setIndiceOptions = (options: Array<LabelUnit>) =>
  ({
    type: CompanySelectionActionType.SET_INDICE_OPTIONS,
    payload: { options }
  } as const);

const setIndiceSelection = (selection: string) =>
  ({
    type: CompanySelectionActionType.SET_INDICE_SELECTION,
    payload: { selection }
  } as const);

const resetIndice = () =>
  ({
    type: CompanySelectionActionType.RESET_INDICE
  } as const);

const setCompaniesInIndice = (companies: Array<CompanyInIndice>) =>
  ({
    type: CompanySelectionActionType.SET_COMPANY_IN_INDICE,
    payload: { companies }
  } as const);

const resetCompaniesInIndice = () =>
  ({
    type: CompanySelectionActionType.RESET_COMPANY_IN_INDICE
  } as const);
// const setCompanyOptions = (options: Array<LabelUnit>) =>
//   ({
//     type: CompanySelectionActionType.SET_COMPANY_OPTIONS,
//     payload: { options }
//   } as const);
//
// const setCompanySelection = (selection: string) =>
//   ({
//     type: CompanySelectionActionType.SET_COMPANY_SELECTION,
//     payload: { selection }
//   } as const);
//
// const resetCompany = () =>
//   ({
//     type: CompanySelectionActionType.RESET_COMPANY
//   } as const);

const companySelectionAction = {
  getContinentOptions,
  getContinentOptionsFailure,
  setContinentOptions,
  setContinentSelection,
  setCountryOptions,
  setCountrySelection,
  resetCountry,
  setIndiceOptions,
  setIndiceSelection,
  resetIndice,
  setCompaniesInIndice,
  resetCompaniesInIndice
};

type CompanySelectionActionGroup = ReturnTypeOfGroup<typeof companySelectionAction>;
type CompanySelectionActionUnion = CompanySelectionActionGroup[keyof CompanySelectionActionGroup];

export { companySelectionAction, CompanySelectionActionType, CompanySelectionActionGroup, CompanySelectionActionUnion };
