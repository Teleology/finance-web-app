enum AlphaFunction {
  DAILY = 'TIME_SERIES_DAILY',
  WEEKLY = 'TIME_SERIES_WEEKLY',
  MONTHLY = 'TIME_SERIES_MONTHLY',
  LATEST = 'GLOBAL_QUOTE',
  SEARCH = 'SYMBOL_SEARCH'
}

const serviceIDS = {
  // TODO rename to camel case
  StockDataService: Symbol.for('StockDataService'),
  CompanySearchService: Symbol.for('CompanySearch'),
  companySelectionService: Symbol.for('companySelection')
};

export { AlphaFunction, serviceIDS };
