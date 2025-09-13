import fetchService from "../data/fetchService";
import type { VacancyObj } from "../types/vacancies";

export default async function useSetVacancy(data: VacancyObj) {
  const body = JSON.stringify(data);

  const response = await fetchService("POST", "set-vacancies", body, {
    "Content-Type": "application/json",
  });

  return response;
}
