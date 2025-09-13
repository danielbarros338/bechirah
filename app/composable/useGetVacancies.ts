import fetchService from "../data/fetchService";
import type { VacanciesResponse, Vacancy } from "../types/vacancies";

export default async function useGetVacancies(): Promise<Vacancy[]> {
  const response = await fetchService("GET", "get-vacancies", null, {});

  const formatedResponse = response.map((vacancie: VacanciesResponse): Vacancy => ({
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
