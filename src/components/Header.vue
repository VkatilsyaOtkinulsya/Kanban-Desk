<script setup lang="ts">
defineProps<{
  title: string
  style?: string
}>()
</script>

<template>
  <nav class="main__header" style="style">
    <div class="header-item">
      <a>{{ title }}</a>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.main__header {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 30px;
  gap: 14px;
  box-sizing: border-box;
  background-color: #cccccc;
  height: 60px;
}

.header-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
