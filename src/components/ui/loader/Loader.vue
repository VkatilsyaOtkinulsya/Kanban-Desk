<script setup lang="ts">
import { VueSpinner } from 'vue3-spinners';

defineProps<{
  color: string;
}>();
</script>

<template>
  <VueSpinner size="30" :color="color"></VueSpinner>
</template>
