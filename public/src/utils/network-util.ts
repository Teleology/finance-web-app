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
export { baseUrl, UrlQueryTime, searchLink, compareLink, infoLink };
