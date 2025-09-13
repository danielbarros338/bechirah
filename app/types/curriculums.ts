export interface Curriculum {
  id: number;
  name: string;
  ranking: number;
  review: string;
  professionId: number;
}

export interface CurriculumResponse {
  json: Curriculum;
  pairedItem: Array<PairedItem>;
}

export interface PairedItem {
  item: number;
}
