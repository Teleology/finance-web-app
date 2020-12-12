import { reject } from 'lodash';
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
        collectionList: [...prevState.collectionList, action.payload.company]
      };
    case CompanyCollectionActionType.REMOVE_COMPANY:
      return {
        ...prevState,
        collectionList: reject(prevState.collectionList, { value: action.payload.company.value })
      };
    default: {
      return prevState;
    }
  }
};

export { companyCollectionReducer, CompanyCollectionState };
