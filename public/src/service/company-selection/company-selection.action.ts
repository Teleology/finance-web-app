import { ReturnTypeOfGroup } from '../../utils/type-util';
import { LabelUnit } from '../../utils/general-type';

namespace CompanySelectionActionType {
  export const GET_CONTINENT_OPTIONS = 'company-selection/GET_CONTINENT_OPTIONS';
  export const SET_CONTINENT_OPTIONS = 'company-selection/SET_CONTINENT_OPTIONS';
  export const SET_CONTINENT_SELECTION = 'company-selection/SET_CONTINENT_SELECTION';
  export const GET_COUNTRY_OPTIONS = 'company-selection/GET_COUNTRY_OPTIONS';
  export const SET_COUNTRY_OPTIONS = 'company-selection/SET_COUNTRY_OPTIONS';
  export const SET_COUNTRY_SELECTION = 'company-selection/SET_COUNTRY_SELECTION';
  export const GET_INDICE_OPTIONS = 'company-selection/GET_INDICE_OPTIONS';
  export const SET_INDICE_OPTIONS = 'company-selection/SET_INDICE_OPTIONS';
  export const SET_INDICE_SELECTION = 'company-selection/SET_INDICE_SELECTION';
  export const GET_COMPANY_OPTIONS = 'company-selection/GET_COMPANY_OPTIONS';
  export const SET_COMPANY_OPTIONS = 'company-selection/SET_COMPANY_OPTIONS';
  export const SET_COMPANY_SELECTION = 'company-selection/SET_COMPANY_SELECTION';
}
const getContinentOptions = () =>
  ({
    type: CompanySelectionActionType.GET_CONTINENT_OPTIONS
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

const getCountryOptions = () =>
  ({
    type: CompanySelectionActionType.GET_COUNTRY_OPTIONS
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

const getIndiceOptions = () =>
  ({
    type: CompanySelectionActionType.GET_INDICE_OPTIONS
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

const setCompanyOptions = (options: Array<LabelUnit>) =>
  ({
    type: CompanySelectionActionType.SET_COMPANY_OPTIONS,
    payload: { options }
  } as const);

const setCompanySelection = (selection: string) =>
  ({
    type: CompanySelectionActionType.SET_COMPANY_SELECTION,
    payload: { selection }
  } as const);
const companySelectionAction = {
  getContinentOptions,
  setContinentOptions,
  setContinentSelection,
  getCountryOptions,
  setCountryOptions,
  setCountrySelection,
  getIndiceOptions,
  setIndiceOptions,
  setIndiceSelection,
  setCompanyOptions,
  setCompanySelection
};

type CompanySelectionActionGroup = ReturnTypeOfGroup<typeof companySelectionAction>;
type CompanySelectionActionUnion = CompanySelectionActionGroup[keyof CompanySelectionActionGroup];

export { companySelectionAction, CompanySelectionActionType, CompanySelectionActionGroup, CompanySelectionActionUnion };
