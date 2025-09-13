export interface VacancyObj {
  profession: string;
  experienceTime: number;
  type: string;
  location: string | null;
  cutRanking: number;
  emailTitle: string;
  description: string;
}

export interface Vacancy extends VacancyObj {
  id: number;
}

export interface VacanciesResponse {
  json: Vacancy;
  pairedItem: Array<PairedItem>;
}

export interface PairedItem {
  item: number;
}
