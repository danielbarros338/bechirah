<template>
  <div>
    <UNavigationMenu
      :items="items"
      class="shadow-lg"
      color="warning"
    />
    <UContainer class="min-h-screen py-5">
      <slot />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Candidatos',
    icon: 'mdi-people',
    children: [
      {
        label: 'Listar',
        icon: 'mdi-format-list-bulleted',
        to: '/candidatos/listar',
      },
    ]
  },{
    label: 'Vagas',
    icon: 'mdi-briefcase',
    children: [
      {
        label: 'Listar',
        icon: 'mdi-format-list-bulleted',
        to: '/vagas/listar',
      },
      {
        label: 'Criar',
        icon: 'mdi-plus-box',
        to: '/vagas/criar',
      },
    ],

  }
])
</script>