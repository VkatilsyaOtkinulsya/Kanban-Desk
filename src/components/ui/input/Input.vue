<script setup lang="ts">
import type { HtmlHTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  defaultValue: string | number;
  modelValue: string | number;
  type: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'number';
  class?: HtmlHTMLAttributes['class'];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
});
</script>

<template>
  <input :type="props.type" :class="props.class" v-model="modelValue" />
</template>

<style scoped lang="'scss'">
.button {
  padding: 8px 16px;
  background: #ccc;

  &--active {
    background: blue;
  }
}
</style>
