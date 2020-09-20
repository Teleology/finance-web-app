/* eslint-disable @typescript-eslint/no-explicit-any */
type ReturnTypeOfGroup<Group> = {
  [key in keyof Group]: Group[key] extends (...args: Array<any>) => any ? ReturnType<Group[key]> : never;
};

type Nullable<T> = { [P in keyof T]: T[P] | null };

export { Nullable, ReturnTypeOfGroup };
