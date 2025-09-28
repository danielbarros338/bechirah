<template>
  <NuxtLayout>
     <div>
      <h1 class="text-3xl font-bold text-gray-500 mb-6">
        Listagem de vagas
      </h1>
    </div>

    <div :class="['grid', isModalDescriptionOpen ? 'grid-cols-2 gap-10' : 'grid-cols-1']">
      <UTable
        :data="vacancies"
        :columns="columns"
      />

      <div 
        :class="[
          isModalDescriptionOpen ? 'block' : 'hidden',
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

    <DeleteModalGlobal
      :is-open="isModalExcludeOpen"
      :vacancy-name="excludeVacancy?.profession || ''"
      @cancel="cancelDeleteVacancy"
      @confirm="confirmDeleteVacancy"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import DeleteModalGlobal from '../../components/listar/DeleteModal.global.vue';
import useDeleteVacancy from '../../composable/useDeleteVacancy';
import useGetVacancies from '../../composable/useGetVacancies';
import type { Vacancy } from '../../types/vacancies';


const UButton = resolveComponent('UButton') as Component;

const isModalDescriptionOpen = ref(false);
const isModalExcludeOpen = ref(false);
const excludeVacancy = ref<Vacancy>();
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
      return h('div', { class: 'flex gap-2' }, [
        h(
          UButton,
          {
            color: 'neutral',
            variant: 'ghost',
            class: 'cursor-pointer',
            onClick: () => openModal(row.original)
          },
          () => 'Ver descrição'
        ),
        h(
          UButton,
          {
            color: 'red',
            variant: 'ghost',
            icon: 'i-heroicons-trash',
            class: 'cursor-pointer',
            onClick: () => deleteVacancy(row.original)
          },
          () => ''
        )
      ]);
    }
  }
];

const selectedVacancie = ref<Vacancy | null>(null);

function openModal(vacancie: Vacancy) {
  selectedVacancie.value = vacancies.value.find(v => v.id === vacancie.id) || null;
  isModalDescriptionOpen.value = true;
}

function deleteVacancy(vacancy: Vacancy) {
  excludeVacancy.value = vacancy;
  isModalExcludeOpen.value = true;
}

function cancelDeleteVacancy() {
  isModalExcludeOpen.value = false;
}

async function confirmDeleteVacancy() {
  if (excludeVacancy.value) {
    await useDeleteVacancy(excludeVacancy.value.id);
    vacancies.value = await useGetVacancies();
    
    excludeVacancy.value = undefined;
  } else {
    // TODO: implementar toast de erro
  }

  isModalExcludeOpen.value = false;
}

onMounted(async () => {
  vacancies.value = await useGetVacancies();
})
</script>