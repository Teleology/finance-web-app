import { reject as _reject, slice as _slice } from 'lodash';
import { LabelText } from '../../utils/type-util';
import { RootAction } from '../root-store';
import { CompanyCollectionActionType } from './company-collection.util';

type CompanyCollectionState = {
  activeSymbol: string | null;
  collectionList: Array<LabelText<string>>;
};

// TODO: null or array ? think about it
const defaultState: CompanyCollectionState = {
  activeSymbol: 'MSFT',
  collectionList: []
};

const companyCollectionReducer = (prevState: CompanyCollectionState = defaultState, action: RootAction): CompanyCollectionState => {
  switch (action.type) {
    case CompanyCollectionActionType.ADD_COMPANY:
      return {
        ...prevState,
        collectionList: _slice([action.payload.company, ...prevState.collectionList], 0, 5)
      };
    case CompanyCollectionActionType.REMOVE_COMPANY:
      return {
        ...prevState,
        collectionList: _reject(prevState.collectionList, { value: action.payload.company.value })
      };
    case CompanyCollectionActionType.SET_ACTIVE_COMPANY:
      return {
        ...prevState,
        activeSymbol: action.payload.symbol
      };
    default: {
      return prevState;
    }
  }
};

export { companyCollectionReducer, CompanyCollectionState };
