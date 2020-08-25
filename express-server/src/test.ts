import { decode, encode } from 'querystring';

console.log(decode('a=1&b=2&c=1,2,3'));
console.log(encode({ a: '1,2,3' }));
