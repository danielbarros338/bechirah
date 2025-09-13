<template>
  <NuxtLayout>
    <div>
      <h1 class="text-3xl font-bold text-gray-500 mb-6">
        Listagem de currículos classificados
      </h1>
    </div>

    <div>
      <USelect
        v-model="selectedVacancy"
        label="Filtrar por vaga"
        placeholder="Selecione uma vaga"
        :items="vacancies.map(v => ({ label: v.profession, value: v.id }))"
        clearable
        @update:model-value="onSelectVacancy"
      />
    </div>

    <div :class="['grid', isModalOpen ? 'grid-cols-2 gap-10' : 'grid-cols-1']">
      <UTable
        :data="curriculums"
        :columns="columns"
      />

      <div 
        :class="[
          isModalOpen ? 'block' : 'hidden',
          'block py-10 space-y-5 text-gray-500'
        ]"
      >
        <h2 class="text-xl font-bold">{{ selectedCurriculum?.name }}</h2>
        <p>
          <span class="font-bold">Nota do currículo:</span> {{ selectedCurriculum?.ranking }}
        </p>
        <p>{{ selectedCurriculum?.review }}</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { h, ref, resolveComponent, type Component } from 'vue'
import useGetCurriculums from '../../composable/useGetCurriculums'
import useGetVacancies from '../../composable/useGetVacancies'
import type { Curriculum } from '../../types/curriculums'
import type { Vacancy } from '../../types/vacancies'

const curriculums = ref<Curriculum[]>([])
const allCurriculums = ref<Curriculum[]>([])
const vacancies = ref<Vacancy[]>([])
const isModalOpen = ref(false)
const selectedCurriculum = ref<Curriculum | null>(null);
const selectedVacancy = ref<number>();

const UButton = resolveComponent('UButton') as Component

const columns: TableColumn<any>[] = [
  { accessorKey: 'name',    header: 'Nome' },
  { accessorKey: 'ranking', header: 'Nota' },
  {
    accessorKey: 'actions',
    header: 'Descrição',
    cell: ({ row }) => {
      // ✅ Na célula: SOMENTE o botão que abre o modal
      return h(
        UButton,
        {
          color: 'neutral',
          variant: 'ghost',
          onClick: () => openModal(row.original)
        },
        () => 'Ver descrição'
      )
    }
  }
]

function openModal(curriculum: Curriculum) {
  selectedCurriculum.value =
    curriculums.value.find(
      c => c.id === curriculum.id|| null
    ) || null;

  isModalOpen.value = true
}

async function onSelectVacancy() {
  if (allCurriculums.value.length === 0) {
    allCurriculums.value = [...curriculums.value];
  }

  if (selectedVacancy.value) {
    curriculums.value = allCurriculums.value.filter(c => c.professionId === selectedVacancy.value);
  }
}

onMounted(async () => {
  curriculums.value = await useGetCurriculums();
  allCurriculums.value = [...curriculums.value];
  
  vacancies.value = await useGetVacancies();
})
</script>
