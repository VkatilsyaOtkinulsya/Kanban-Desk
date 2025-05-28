<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-content"><slot name="content"></slot></div>
    </div>
  </footer>
</template>

<style scoped></style>
