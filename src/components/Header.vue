<script setup lang="ts">
import { MainIcon } from '@/components/icons/index';

defineProps<{
  title: string;
  style?: string;
}>();
</script>

<template>
  <nav class="main__header" style="style">
    <div class="header-item">
      <MainIcon :size="18" :color="'rgb(17, 16, 18)'" />
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
  background-color: #f5f5f5;
  height: 60px;
}

.header-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1em;
  line-height: 21px;
  font-weight: 500;
  color: rgb(17, 16, 18);
  overflow: hidden;
}
</style>
