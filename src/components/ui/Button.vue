<script setup lang="ts">
defineProps<{
  text: string;
  onClick: () => void;
  color?: string;
  className?: string;
}>();
</script>

<template>
  <button :class="className ? className : ''" type="button" @click="onClick">
    {{ text }}
  </button>
</template>

<style scoped>
button {
  background-color: #23af44;
  color: v-bind(color);
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #000;
  cursor: pointer;
}

.add {
  background-color: #fff;
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #000;
  cursor: pointer;
}

.delete {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #000;
  cursor: pointer;
}
</style>
