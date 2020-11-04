import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import {} from 'react-linkify';
import { Link } from 'react-router-dom';
// @ts-ignore
import * as urlRegex from 'url-regex-safe';
import { store, history } from './root-redux/root-store';
const regex: RegExp = urlRegex();

// console.log(urlRegex().source);
const matchesArray = 'GMAP_2018_HT2_10000.arw'.match(urlRegex());
const matchesArray2 = 'GMAP_2018_HT2_10000.arw'.match(new RegExp(`(${regex.source})`));
const matchesArray3 = 'GMAP_2018_HT2_10000.arw'.match(new RegExp('(\\b' + regex.source + '\\b)'));
const mathesArray4 = 'go to    www.test.com and http://www.testurl.com'.match(new RegExp('(\\b' + regex.source + '\\b)'));
console.log(matchesArray);
console.log(matchesArray2);
console.log(matchesArray3);
console.log(mathesArray4);

// console.log(regex.test('GMAP_2018_HT2_10000.ar'));
// console.log('GMAP_2018_HT2_10000.arw'.match(regex));
// console.log(matchesArray, matchesArray2);

// const matchesArray = 'github.comfoobar'.split(new RegExp( '\\b' + urlRegex().source + '\\b'));
// console.log(matchesArray);
// const input = 'go to    www.test.com and http://www.testurl.com';
// const arrays = input.split(/([\s\r\n,]+)/g);
// const result = arrays.map((value: string): string => {
//   if (regex.test(value)) {
//     return '<>' + value + '<>';
//   } else {
//     return value;
//   }
// });
// console.log(result);
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

const calculateArea = (point: Coordinate, container: ISize, padding: number): string => {
  const { left, top } = point;
  const { width, height } = container;
  if (left < padding && top < padding) {
    return 'leftTop';
  } else if (left < padding && top > height - padding) {
    return 'leftBottom';
  } else if (left > width - padding && top > height - padding) {
    return 'rightBottom';
  } else if (left > width - padding && top < padding) {
    return 'rightTop';
  } else if (left <= padding) {
    return 'left';
  } else if (top >= height - padding) {
    return 'bottom';
  } else if (left >= width - padding) {
    return 'right';
  } else if (top <= padding) {
    return 'top';
  } else {
    return 'center';
  }
};
const a = (): React.ReactElement => (
  <div
    style={{ width: 500, height: 500, background: 'blue' }}
    onMouseMove={(e: React.MouseEvent) => {
      const result = calculateArea({ left: e.nativeEvent.offsetX, top: e.nativeEvent.offsetY }, { width: 500, height: 500 }, 10);
      console.log(result);
    }}
  >
    React App
    <Link to={'/b'}>To B</Link>
  </div>
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
