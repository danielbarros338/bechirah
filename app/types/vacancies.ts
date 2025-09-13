export interface Vacancie {
  id: number;
  profession: string;
  experienceTime: number;
  type: string;
  location: string | null;
  cutRanking: number;
  emailTitle: string;
  description: string;
}

export interface VacanciesResponse {
  json: Vacancie;
  pairedItem: Array<PairedItem>;
}

export interface PairedItem {
  item: number;
}
