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
