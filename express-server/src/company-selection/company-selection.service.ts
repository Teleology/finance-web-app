// TODO: continent -> country -> indices -> company

import { injectable } from 'inversify';
const continent = ['asia', 'europe', 'oceania', 'africa', 'north-america', 'south-america'] as const;
type Continent = typeof continent[number];
type Country = { country: string; continent: Continent };
const countries: Array<Country> = [
  { country: 'brazil', continent: 'north-america' },
  { country: 'canada', continent: 'north-america' },
  { country: 'china', continent: 'asia' },
  { country: 'denmark', continent: 'europe' },
  { country: 'dubai', continent: 'asia' },
  { country: 'finland', continent: 'europe' },
  { country: 'france', continent: 'europe' },
  { country: 'germany', continent: 'europe' },
  { country: 'india', continent: 'asia' },
  { country: 'indonesia', continent: 'oceania' },
  { country: 'ireland', continent: 'europe' },
  { country: 'japan', continent: 'asia' },
  { country: 'malaysia', continent: 'asia' },
  { country: 'mexico', continent: 'north-america' },
  { country: 'netherlands', continent: 'europe' },
  { country: 'pakistan', continent: 'asia' },
  { country: 'philippines', continent: 'asia' },
  { country: 'russia', continent: 'europe' },
  { country: 'saudi-arabia', continent: 'asia' },
  { country: 'singapore', continent: 'asia' },
  { country: 'south-africa', continent: 'africa' },
  { country: 'spain', continent: 'europe' },
  { country: 'sweden', continent: 'europe' },
  { country: 'switzerland', continent: 'europe' },
  { country: 'thailand', continent: 'asia' },
  { country: 'turkey', continent: 'asia' },
  { country: 'united-arab-emirates', continent: 'asia' },
  { country: 'united-kingdom', continent: 'europe' },
  { country: 'united-states', continent: 'north-america' }
];

@injectable()
class CompanySelectionService {
  public getContinent();
}
