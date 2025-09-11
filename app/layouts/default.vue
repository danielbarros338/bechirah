<template>
  <div>
    <UNavigationMenu collapsed :items="items" class="p-4 shadow-lg" color="success" />
    <UContainer class="min-h-screen">
      <slot />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Triagem de currículos',
    icon: 'mdi-file-search',
    to: '/triagem',
  }
])
</script>