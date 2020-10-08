import * as React from 'react';
import { isEmpty } from 'lodash';
// eslint-disable-next-line @typescript-eslint/naming-convention
// type ReturnedType =
// const StatefulHoc = function <T>(test: (props: T) => boolean, LeftComponent: React.FC<T>): (BaseComponent: React.FC<T>) => React.FC<T> {
//   const branch = (props: T): React.ReactElement => {
//     if (test(props)) {
//       return <LeftComponent {...props} />;
//     } else {
//       return <BaseComponent {...props} />;
//     }
//   };
//   return branch;
// };

const StatefulHoc = <L, P extends L>(test: (props: P) => boolean, LeftComponent: React.FC<L>) => (BaseComponent: React.FC<P>) => (
  props: P
): React.ReactElement => {
  if (test(props)) {
    return <LeftComponent {...props} />;
  } else {
    return <BaseComponent {...props} />;
  }
};

const TestComponent: React.FC<{ randomProp: Array<string> }> = (props: { randomProp: Array<string> }): React.ReactElement => (
  <div>123123123 {props.randomProp}</div>
);

StatefulHoc(
  (props: { randomProp: Array<string> }) => isEmpty(props.randomProp),
  () => <div>I am empty</div>
)(TestComponent);

// const ProcessComponentXXX = StatefulHoc(
//   (props: { randomProp: Array<string> | null }): boolean => {
//     console.log(props.randomProp);
//     return props.randomProp === null;
//   },
//   () => <div>I am empty</div>
// )();
// const ProcessedComponent = branch(
//   (props: { randomProp: Array<string> | null }): boolean => {
//     console.log(props.randomProp);
//     return props.randomProp === null;
//   },
//   renderComponent(() => <div>I am empty</div>)
// )(
//   branch(
//     (props: { randomProp: Array<string> }) => isEmpty(props.randomProp),
//     renderComponent(() => <div>I am empty</div>)
//   )(TestComponent)
// );
//
// <ProcessedComponent randomProp={null} />;

// eslint-disable-next-line @typescript-eslint/naming-convention
// const ProcessComponentXXX = flow(
//   StatefulHoc(
//     (props: { randomProp: Array<string> }) => {
//       console.log(props.randomProp);
//       return isEmpty(props.randomProp);
//     },
//     () => <div>I am empty</div>
//   ),
//   StatefulHoc()
// )(TestComponent);
//
// type T = { randomProp: Array<string> };
// const fna = function <U extends T>(input: U): void {
//   console.log(input);
// };
// fna({});

// type XXX = { a: string; b: string } extends { a: string } ? { m: string } : never;
// export { ProcessComponentXXX };
