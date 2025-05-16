<script setup>
const props = defineProps({
  text: string,
  onClick: () => {},
})
</script>

<template>
  <textarea name="task" @click="onClick" class="task-text">{{ props.text }}</textarea>
</template>

<style scoped>
.task-text {
  width: 100%;
  min-height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  overflow: auto;
  display: inline-block;
  cursor: pointer;
}
</style>
