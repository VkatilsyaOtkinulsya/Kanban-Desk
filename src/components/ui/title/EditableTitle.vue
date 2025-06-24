<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = withDefaults(defineProps<{ modelValue?: string }>(), {
  modelValue: 'Активные проекты',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isEditing = ref(false);
const editedTitle = ref(props.modelValue);
const inputRef = ref<HTMLInputElement | null>(null);

const title = computed(() => props.modelValue);

const enableEdit = () => {
  isEditing.value = true;
  editedTitle.value = props.modelValue;
  setTimeout(() => inputRef.value?.focus(), 0);
};

const saveChanges = () => {
  isEditing.value = false;
  const newTitle = editedTitle.value.trim();
  if (newTitle) {
    emit('update:modelValue', newTitle);
  }
};

const cancelEditing = () => {
  isEditing.value = false;
  editedTitle.value = props.modelValue;
};

watch(
  () => props.modelValue,
  (newValue) => {
    editedTitle.value = newValue;
  }
);
</script>

<template>
  <p v-if="!isEditing" @click="enableEdit" class="editable-title">{{ title }}</p>
  <input
    v-else
    v-model="editedTitle"
    ref="inputRef"
    @blur="saveChanges"
    @keydown.enter="saveChanges"
    @keydown.escape="cancelEditing"
    class="editable-input"
    type="text"
  />
</template>

<style scoped lang="scss">
.editable-input {
  width: 100%;
  font-size: 18px;
  line-height: 1.8rem;
  font-family: inherit;
  padding: 10px 14px;
  font-size: 16px;
  font-weight: normal;
  outline: 1px solid #ccc;
  border-radius: 3px;

  margin-right: 26px;
  box-sizing: border-box;
}

.editable-title {
  cursor: pointer;
  font-weight: 500;
  line-height: 2rem;
  padding: 10px 14px;
}

.project__title {
}

.editable-title {
  cursor: pointer;
  outline: none;
  font-size: 18px;
}

input.editable-title {
  font-size: 18px;
  padding-left: 10px;
  font-size: 16px;
  font-weight: normal;
  outline: 1px solid #000;
  border-radius: 3px;
}
</style>
