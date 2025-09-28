import fetchService from "../data/fetchService";

export default async function useDeleteVacancy(data: number) {
  const response = await fetchService(
    "DELETE",
    `0a1a1519-6a60-43e3-8238-e0628d388539/delete-vacancies/${data}`,
    null,
    {}
  );

  return response;
}
