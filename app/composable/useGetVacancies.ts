import fetchService from "../data/fetchService";
import type { Vacancie, VacanciesResponse } from "../types/vacancies";

export default async function useGetVacancies(): Promise<Vacancie[]> {
  const response = await fetchService("GET", "get-vacancies", null, {});

  const formatedResponse = response.map((vacancie: VacanciesResponse): Vacancie => ({
    id: vacancie.json.id,
    profession: vacancie.json.profession,
    experienceTime: vacancie.json.experienceTime,
    type: vacancie.json.type,
    location: vacancie.json.location,
    cutRanking: vacancie.json.cutRanking,
    emailTitle: vacancie.json.emailTitle,
    description: vacancie.json.description,
  }));

  return formatedResponse;
}
