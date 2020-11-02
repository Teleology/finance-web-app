const baseUrl = '/api/v1';
const searchLink = '/search';
const compareLink = '/compare';
const infoLink = '/info';

enum UrlQueryTime {
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  LATEST = 'latest'
}

enum FetchStatusEnum {
  NEVER = 'never',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'failure'
}

export { baseUrl, UrlQueryTime, FetchStatusEnum, searchLink, compareLink, infoLink };
