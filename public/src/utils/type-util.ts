/* eslint-disable @typescript-eslint/no-explicit-any */
type ReturnTypeOfGroup<Group> = {
  [key in keyof Group]: Group[key] extends (...args: Array<any>) => any ? ReturnType<Group[key]> : never;
};

type Nullable<T> = { [P in keyof T]: T[P] | null };

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type LabelText<T> = { value: T; label: string };

// adapted from https://github.com/piotrwitek/utility-types
type DeepNonNullableObject<T> = {
  [P in keyof T]: DeepNonNullable<NonNullable<T[P]>>;
};

type DeepNonNullable<T> = T extends object ? DeepNonNullableObject<T> : T;

export { Nullable, ReturnTypeOfGroup, Override, LabelText, DeepNonNullable };
