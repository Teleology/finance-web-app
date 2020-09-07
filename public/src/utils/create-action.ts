// type Action<T, P> = {
//   type: T;
//   P?: P;
// };
//
// type ActionFunction0<R> = () => R;
// type ActionFunction1<T1, R> = (t1: T1) => R;
// type ActionFunction2<T1, T2, R> = (t1: T1, t2: T2) => R;
// type ActionFunction3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
// type ActionFunction4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;
// // @ts-ignore
// function createAction<T, P>(actionType: T, PCreator: ActionFunction0<P>): ActionFunction0<Action<T, P>>;
// // @ts-ignore
// function createAction<T, P, A1>(actionType: T, PCreator: ActionFunction1<A1, P>): ActionFunction1<A1, Action<T, P>>;
// // @ts-ignore
// function createAction<T, P, A1, A2>(actionType: T, PCreator: ActionFunction2<A1, A2, P>): ActionFunction2<A1, A2, Action<T, P>>;
// // @ts-ignore
// function createAction<T, P, A1, A2, A3>(actionType: T, PCreator: ActionFunction3<A1, A2, A3, P>): ActionFunction3<A1, A2, A3, Action<T, P>>;
//
// // @ts-ignore
// function createAction<T, P, A1, A2, A3, A4>(actionType: T, PCreator: ActionFunction4<A1, A2, A3, A4, P>): ActionFunction4<A1, A2, A3, A4, Action<T, P>>;
//
// // export function createAction<T, P>(
// //   actionType: T
// // ): ActionFunction1<P, Action<P>>;
//
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const createAction = (actionType: any, creator: (...args: Array<any>) => any): any => (...args: Array<any>): any => ({
//   type: actionType,
//   payload: creator(...args)
// });
