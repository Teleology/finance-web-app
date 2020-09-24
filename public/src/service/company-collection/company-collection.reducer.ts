import { LabelText } from '../../utils/type-util';
import { RootAction } from '../root-store';
import { CompanyCollectionActionType } from './company-collection.action';

type CompanyCollectionState = {
  collections: Array<LabelText<string>>;
};

// TODO: null or array ? think about it
const defaultState: CompanyCollectionState = {
  collections: []
};

const companyCollectionReducer = (prevState: CompanyCollectionState = defaultState, action: RootAction): CompanyCollectionState => {
  switch (action.type) {
    case CompanyCollectionActionType.ADD_COMPANY: {
      return {
        collections: [...prevState.collections, action.payload.company]
      };
    }
    default: {
      return prevState;
    }
  }
};

export { companyCollectionReducer, CompanyCollectionState };
