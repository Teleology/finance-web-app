import { ReturnTypeOfGroup } from '../../typing/action.type';

namespace CompanySelectionActionType {
  export const GET_CONTINENT_OPTIONS = 'company-selection/GET_CONTINENT_OPTIONS';
  export const SET_CONTINENT_SELECTION = 'company-selection/SET_CONTINENT_SELECTION';
  export const GET_COUNTRY_OPTIONS = 'company-selection/GET_COUNTRY_OPTIONS';
  export const SET_COUNTRY_SELECTION = 'company-selection/SET_COUNTRY_SELECTION';
}
const getContinentOptions = () =>
  ({
    type: CompanySelectionActionType.GET_CONTINENT_OPTIONS
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

const setCountrySelection = (selection: string) =>
  ({
    type: CompanySelectionActionType.SET_COUNTRY_SELECTION,
    payload: { selection }
  } as const);

const companySelectionAction = {
  getContinentOptions,
  setContinentSelection,
  getCountryOptions,
  setCountrySelection
};

type CompanySelectionActionGroup = ReturnTypeOfGroup<typeof companySelectionAction>;
type CompanySelectionActionUnion = CompanySelectionActionGroup[keyof CompanySelectionActionGroup];

export {
  getContinentOptions,
  setContinentSelection,
  getCountryOptions,
  setCountrySelection,
  CompanySelectionActionType,
  CompanySelectionActionGroup,
  CompanySelectionActionUnion
};
