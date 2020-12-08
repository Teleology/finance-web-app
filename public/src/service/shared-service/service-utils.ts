import { RootAction } from '../root-store';

type ErrorInEpic = {
  error: Error;
  action: RootAction;
};

export { ErrorInEpic };
