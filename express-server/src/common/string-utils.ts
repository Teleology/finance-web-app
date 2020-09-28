enum AlphaFunction {
  DAILY = 'TIME_SERIES_DAILY',
  WEEKLY = 'TIME_SERIES_WEEKLY',
  MONTHLY = 'TIME_SERIES_MONTHLY',
  LATEST = 'GLOBAL_QUOTE',
  SEARCH = 'SYMBOL_SEARCH',
  OVERVIEW = 'OVERVIEW'
}

const serviceIDS = {
  stockDataService: Symbol.for('StockDataService'),
  companySearchService: Symbol.for('CompanySearch'),
  companySelectionService: Symbol.for('companySelection'),
  companyInfoService: Symbol.for('companyInfo')
};

export { AlphaFunction, serviceIDS };
