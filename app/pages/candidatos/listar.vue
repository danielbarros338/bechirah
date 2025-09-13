<template>
  <NuxtLayout>
    <div>
      <h1 class="text-3xl font-bold text-gray-500 mb-6">
        Listagem de currículos classificados
      </h1>
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
import type { Curriculum } from '../../types/curriculums'

const curriculums = ref<Curriculum[]>([])
const isModalOpen = ref(false)
const selectedCurriculum = ref<Curriculum | null>(null)

// Você pode usar resolveComponent ou as tags diretas (com auto-import do Nuxt UI).
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
  selectedCurriculum.value = curriculums.value.find(c => c.id === curriculum.id) || null
  isModalOpen.value = true
}

onMounted(async () => {
  curriculums.value = await useGetCurriculums()
  console.log(curriculums.value)
})
</script>
