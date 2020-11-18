// import * as React from 'react';
// import { fromEventPattern, Observable } from 'rxjs';
// import { noop } from 'lodash';
// import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';
// const useEventStream = <T>(subscriber: (value: T) => void): { stream: Observable<T>; handler: NodeEventHandler } =>
//   React.useMemo(() => {
//     let myHandler = noop;
//     const stream$ = fromEventPattern<T>((handler: NodeEventHandler) => {
//       myHandler = handler;
//     });
//     stream$.subscribe(subscriber);
//     return { stream: stream$, handler: myHandler };
//   }, [subscriber]);
//
// export { useEventStream };

import { fromEvent, race, timer } from 'rxjs';
import { filter } from 'rxjs/operators';
const debounceWithEnterKey = race(fromEvent<KeyboardEvent>(document, 'keyup').pipe(filter((event: KeyboardEvent) => event.key === 'Enter')), timer(1000));

const logFlow = <T>(input: T): T => {
  console.log(input);
  return input;
};
export { debounceWithEnterKey, logFlow };
