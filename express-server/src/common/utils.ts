import { camelCase, flow, replace } from 'lodash/fp';

export const numberSpaceReplaceFn1: (input: string) => string = flow(replace(/[0-9.]/gi)(''), camelCase);
