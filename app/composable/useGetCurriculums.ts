import fetchService from "../data/fetchService";
import type { Curriculum, CurriculumResponse } from "../types/curriculums";

export default async function useGetCurriculums(): Promise<Curriculum[]> {
  const response = await fetchService("GET", "get-curriculums", null, {});  

  const formatedResponse = response.map((curriculum: CurriculumResponse): Curriculum => ({
    id: curriculum.json.id,
    name: curriculum.json.name,
    review: curriculum.json.review,
    ranking: curriculum.json.ranking,
    professionId: curriculum.json.professionId,
  }));

  return formatedResponse;
}
