import { LabelText, Nullable } from '../../utils/type-util';
import { RootAction } from '../root-store';
import { CompanyCollectionActionType } from './comany-collection.action';

type CompanyCollectionState = {
  collection: Nullable<LabelText<string>>;
  collectionList: Array<LabelText<string>>;
};

// TODO: null or array ? think about it
const defaultState: CompanyCollectionState = {
  collection: {
    value: null,
    label: null
  },
  collectionList: []
};

const companyCollectionReducer = (prevState: CompanyCollectionState = defaultState, action: RootAction): CompanyCollectionState => {
  switch (action.type) {
    case CompanyCollectionActionType.ADD_COMPANY:
      return {
        ...prevState,
        collectionList: [...prevState.collectionList, action.payload.company]
      };
    default: {
      return prevState;
    }
  }
};

export { companyCollectionReducer, CompanyCollectionState };
