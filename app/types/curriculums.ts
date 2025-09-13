export interface Curriculum {
  id: number;
  name: string;
  ranking: number;
  review: string;
}

export interface CurriculumResponse {
  json: Curriculum;
  pairedItem: Array<PairedItem>;
}

export interface PairedItem {
  item: number;
}
