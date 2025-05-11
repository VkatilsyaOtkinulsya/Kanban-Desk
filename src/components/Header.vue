<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <header>
    <div class="container">
      <div class="header-content">{{ title }}</div>
    </div>
  </header>
</template>

<style scoped></style>
