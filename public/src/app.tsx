import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
// @ts-ignore
import * as urlRegex from 'url-regex-safe';
import { store, history } from './root-redux/root-store';

// console.log(urlRegex().source);
// const matchesArray = 'GMAP_2018_HT2_10000.arw'.split(urlRegex());
// const matchesArray2 = 'GMAP_2018_HT2_10000.arw'.match(new RegExp('(' + urlRegex().source + ')'));
const regex: RegExp = urlRegex({ exact: true });
console.log(regex.test('GMAP_2018_HT2_10000.ar'));
console.log('GMAP_2018_HT2_10000.arw'.match(regex));
// console.log(matchesArray, matchesArray2);

// const matchesArray = 'github.comfoobar'.split(new RegExp( '\\b' + urlRegex().source + '\\b'));
// console.log(matchesArray);
const input = 'go to    www.test.com and http://www.testurl.com';
const arrays = input.split(/([\s\r\n,]+)/g);
const result = arrays.map((value: string): string => {
  if (regex.test(value)) {
    return '<>' + value + '<>';
  } else {
    return value;
  }
});
console.log(result);
// const startIndex = regex.lastIndex;
// const result = regex.exec(input);
// const nextStartIndex = regex.lastIndex;
// const breakIndex = result!!!.index;
// console.log(startIndex, nextStartIndex, breakIndex);
// while (result !== null) {
//   let nextStart =
//   regex.exec(input);
// }
//
// const result = input.split(/\b+/g).map((value: string) => {
//   if (regex.test(value)) {
//     return '<>' + value + '<>';
//   } else {
//     return value;
//   }
// });
//
// console.log(result);
// const str = 'For more information, see Chapter 3.4.5.1, dfajopidjf, see Chapter 3.4.5.1';
// const re = /see (chapter \d+(\.\d)*)/i;
// const found = str.match(re);
// console.log(found);
const a = (): React.ReactElement => (
  <h1>
    React App
    <Link to={'/b'}>To B</Link>
  </h1>
);
const b = (): React.ReactElement => (
  <h1>
    React Bpp
    <Link to={'/c'}>To C</Link>
  </h1>
);
const c = (): React.ReactElement => (
  <h1>
    React Cpp
    <Link to={'/a'}>To A</Link>
  </h1>
);
const d = (): React.ReactElement => (
  <h1>
    404
    <Link to={'/a'}>To A</Link>
  </h1>
);

export const App = (): React.ReactElement => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact={true} path={'/user1'} render={a} />
        <Route exact={true} path="/user2" render={b} />
        <Route exact={true} path="/user3" render={c} />
        <Route exact={true} path="*" render={d} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);
