<template>
  <UModal v-model:open="isOpenVar">
    <template #content>
      <div class="p-3">
        <h2 class="text-2xl mb-3">Deseja realmente excluir a vaga {{ props.vacancyName }}?</h2>
        <p>A ação não terá como ser desfeita</p>
        <div class="mt-5 flex justify-end gap-3">
          <UButton class="cursor-pointer" variant="outline" @click="cancel">Cancelar</UButton>
          <UButton class="cursor-pointer" color="error" @click="confirm">Excluir</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  vacancyName: {
    type: String,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'cancel' | 'confirm', value: boolean): void
}>();

const isOpenVar = ref(props.isOpen);

watch(() => props.isOpen, (newVal) => {
  isOpenVar.value = newVal;
});

const cancel = () => {
  emit('cancel', false);
};

const confirm = () => {
  emit('confirm', true);
};
</script>
