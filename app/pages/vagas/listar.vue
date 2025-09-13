<template>
  <NuxtLayout>
     <div>
      <h1 class="text-3xl font-bold text-gray-500 mb-6">
        Listagem de vagas
      </h1>
    </div>

    <div :class="['grid', isModalOpen ? 'grid-cols-2 gap-10' : 'grid-cols-1']">
      <UTable
        :data="vacancies"
        :columns="columns"
      />

      <div 
        :class="[
          isModalOpen ? 'block' : 'hidden',
          'block py-10 space-y-5 text-gray-500'
        ]"
      >
        <h2 class="text-xl font-bold">{{ selectedVacancie?.profession }}</h2>
        <p>
          <span class="font-bold">Tempo de experiência:</span> {{ selectedVacancie?.experienceTime }}
        </p>
        <p>
          <span class="font-bold">Tipo de contratação:</span> {{ selectedVacancie?.type }}
        </p>
        <p>
          <span class="font-bold">Localização do candidato:</span> {{ selectedVacancie?.location }}
        </p>
        <p>
          <span class="font-bold">Título do e-mail esperado:</span> {{ selectedVacancie?.emailTitle }}
        </p>
        <p>
          <span class="font-bold">Nota de corte:</span> {{ selectedVacancie?.cutRanking }}
        </p>
        <p>{{ selectedVacancie?.description }}</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import useGetVacancies from '../../composable/useGetVacancies';
import type { Vacancy } from '../../types/vacancies';


const UButton = resolveComponent('UButton') as Component;

const isModalOpen = ref(false);
const vacancies = ref<Vacancy[]>([]);
const columns: TableColumn<Vacancy>[] = [
  { accessorKey: 'profession', header: 'Profissão' },
  { accessorKey: 'experienceTime', header: 'Tempo de experiência' },
  { accessorKey: 'type', header: 'Tipo de contratação' },
  { accessorKey: 'location', header: 'Localização do candidato' },
  { accessorKey: 'cutRanking', header: 'Nota de corte' },
  { accessorKey: 'emailTitle', header: 'Título do e-mail esperado' },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return h(
        UButton,
        {
          color: 'neutral',
          variant: 'ghost',
          onClick: () => openModal(row.original)
        },
        () => 'Ver descrição'
      );
    }
  }
];

const selectedVacancie = ref<Vacancy | null>(null);

function openModal(vacancie: Vacancy) {
  selectedVacancie.value = vacancies.value.find(v => v.id === vacancie.id) || null;
  isModalOpen.value = true;
}

onMounted(async () => {
  vacancies.value = await useGetVacancies();
})
</script>