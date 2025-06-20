<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

defineProps<{
  spaceId: string;
}>();

const route = useRoute();
const spaceId = ref(route.params.spaceId as string);

const spaceName = computed(() => {
  return JSON.parse(localStorage.getItem('spaces') as string).data[spaceId.value].name;
});

watch(
  () => route.params.spaceId,
  (newSpaceId) => {
    spaceId.value = newSpaceId as string;
  }
);
</script>

<template>
  <div class="space-wrapper">
    <router-link :to="{ name: 'space-projects', params: { spaceId } }">
      Назад к проектам
    </router-link>
    <h2 class="space__title">Пространство: {{ spaceName }}</h2>
    <router-view />
  </div>
</template>
