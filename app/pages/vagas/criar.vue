<template>
  <NuxtLayout>
    <UForm
      :onsubmit="onSubmit"
      :schema="vacancySchema"
      class="max-w-2xl mx-auto my-10 p-10 border border-gray-200 rounded-lg shadow-lg"
    >
      <UFormField class="w-full" label="Título da Vaga" name="title" required>
        <UInput v-model="vacancy.profession" class="w-full" type="text" />
      </UFormField>

      <UFormField class="w-full" label="Tempo de Experiência (em anos)" name="experienceTime" required>
        <UInput v-model="vacancy.experienceTime" class="w-full" type="number" min="0" />
      </UFormField>

      <UFormField class="w-full" label="Tipo de Vaga" name="type" required>
        <UInput v-model="vacancy.type" class="w-full" type="text" />
      </UFormField>

      <UFormField class="w-full" label="Localização" name="location">
        <UInput v-model="vacancy.location" class="w-full" type="text" />
      </UFormField>

      <UFormField class="w-full" label="Título do E-mail" name="emailTitle" required>
        <UInput v-model="vacancy.emailTitle" class="w-full" type="text" />
      </UFormField>

      <UFormField class="w-full" label="Nota de Corte" name="cutRanking" required>
        <UInput v-model="vacancy.cutRanking" class="w-full" type="number" :min="0" :max="5" :step="0.1" />
      </UFormField>

      <UFormField class="w-full" label="Descrição da Vaga" name="description" required>
        <UTextarea v-model="vacancy.description" class="w-full" :rows="5" />
      </UFormField>

      <div class="mt-6">
        <UButton type="submit" color="primary">Criar Vaga</UButton>
      </div>
    </UForm>
  </NuxtLayout>
</template>

<script setup lang="ts">
import useSetVacancy from '../../composable/useSetVacancy';
import { vacancySchema } from '../../schemas/vacancy';
import type { VacancyObj } from '../../types/vacancies';

const toast = useToast();

const vacancy = ref<VacancyObj>({
  profession: '',
  experienceTime: 0,
  type: '',
  location: '',
  emailTitle: '',
  cutRanking: 0,
  description: ''
});

const onSubmit = async () => {
  const response = await useSetVacancy(vacancy.value);

  console.log(response);

  if (response && !response.error) {
    toast.add({
      color: 'success',
      title: 'Vaga criada',
      description: 'Vaga criada com sucesso!',
    });

    vacancy.value = {
      profession: '',
      experienceTime: 0,
      type: '',
      location: '',
      emailTitle: '',
      cutRanking: 0,
      description: ''
    };
  } else {
    toast.add({
      color: 'error',
      title: 'Erro',
      description: response.message,
    });
  }
}
</script>