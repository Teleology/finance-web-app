import { LabelText, Nullable } from '../../utils/type-util';
import { RootAction } from '../root-store';
import { SharedActionType } from '../shared-service/shared.action';

type CompanyCollectionState = {
  collection: Nullable<LabelText<string>>;
};

// TODO: null or array ? think about it
const defaultState: CompanyCollectionState = {
  collection: {
    value: null,
    label: null
  }
};

const companyCollectionReducer = (prevState: CompanyCollectionState = defaultState, action: RootAction): CompanyCollectionState => {
  switch (action.type) {
    case SharedActionType.COLLECT_COMPANY: {
      return {
        collection: action.payload.company
      };
    }
    default: {
      return prevState;
    }
  }
};

export { companyCollectionReducer, CompanyCollectionState };
