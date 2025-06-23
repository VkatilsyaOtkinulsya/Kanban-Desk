<script setup lang="ts">
import type { HTMLAttributes, InputHTMLAttributes } from 'vue';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  type?: InputHTMLAttributes['type'];
  class?: HTMLAttributes['class'];
  placeholder?: string;
  required?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});
</script>

<template>
  <input
    v-model="value"
    :type="type || 'text'"
    :class="props.class"
    :placeholder="props.placeholder"
    :required="required"
  />
</template>
