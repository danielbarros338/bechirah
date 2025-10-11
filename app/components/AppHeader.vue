<template>
  <header class="bg-white shadow-sm border-b">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold text-primary">
        Bechirah
      </NuxtLink>

      <nav v-if="loggedIn" class="flex items-center gap-4">
        <NuxtLink to="/vagas/listar" class="hover:text-primary">
          Vagas
        </NuxtLink>
        <NuxtLink to="/candidatos/listar" class="hover:text-primary">
          Candidatos
        </NuxtLink>
        
        <div class="flex items-center gap-2">
          <span v-if="user" class="text-sm text-gray-600">{{ user.email }}</span>
          <UButton 
            color="red" 
            variant="soft" 
            size="sm"
            @click="handleLogout"
          >
            Sair
          </UButton>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from '../composable/useAuth';

const { user, loggedIn, logout } = useAuth();

const handleLogout = async () => {
  await logout();
};
</script>
