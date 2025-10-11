<template>
  <div>
    <!-- Loading screen apenas no cliente quando necessário -->
    <LoadingScreen v-if="showLoading" />
    
    <!-- Layout normal -->
    <template v-else>
      <UNavigationMenu
        :items="items"
        class="shadow-lg"
        color="warning"
      />
      <UContainer class="min-h-screen py-5">
        <slot />
      </UContainer>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { useAuth } from '../composable/useAuth';
import { useAuthLoading } from '../composable/useAuthLoading';

const { logout } = useAuth();
const { isAuthenticating } = useAuthLoading();

const handleLogout = async () => {
  await logout();
};

// Mostrar loading apenas no cliente durante transições críticas
const showLoading = computed(() => {
  // No servidor, nunca mostrar loading (evita layout shift)
  if (import.meta.server) return false;
  
  // No cliente, mostrar apenas durante autenticação ativa
  return isAuthenticating.value;
});

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
  }, {
    label: 'Sair',
    icon: 'mdi-logout',
    onClick: handleLogout
  }
])
</script>