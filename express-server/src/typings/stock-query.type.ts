export type StockQueryType = {
  symbol: string;
  function: string;
};
export type StockIntradayQueryType = {
  interval: string;
} & StockQueryType;

const a = '2';
console.log(a);
