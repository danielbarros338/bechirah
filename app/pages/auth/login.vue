<template>
  <UContainer class="min-h-screen flex flex-col justify-center items-center">
    <UForm class="w-3/12 shadow-xl p-5 rounded-xl" :schema="loginSchema" :state="state" @submit="onSubmit">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>

      <UFormField class="w-full" label="Email" name="email" required>
        <UInput v-model="state.email" class="w-full" type="email" />
      </UFormField>

      <UFormField class="w-full" label="Senha" name="password" required>
        <UInput v-model="state.password" class="w-full" type="password" />
      </UFormField>

      <UButton type="submit" color="primary" class="mt-4 w-full" :disabled="buttonDisabled">Login</UButton>
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import { loginSchema } from '../../schemas/login';

const state = reactive({
  email: undefined,
  password: undefined,
});

const toast = useToast();
const router = useRouter();

const buttonDisabled = computed(() => {
  return !state.email || !state.password;
});

const onSubmit = async () => {
  toast.add({
    color: 'success',
    title: 'Login realizado',
    description: 'Você fez o login com sucesso!'
  });

  router.push('/');
}
</script>