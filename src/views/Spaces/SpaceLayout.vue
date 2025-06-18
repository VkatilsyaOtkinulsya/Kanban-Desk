<script setup lang="ts">
defineProps<{
  spaceId: string;
}>();
</script>

<template>
  <div class="space-wrapper">
    <router-link :to="{ name: 'space-projects', params: { spaceId } }">
      Назад к проектам
    </router-link>
    <h2 class="space__title">Пространство: {{ spaceId }}</h2>
    <router-view />
  </div>
</template>
