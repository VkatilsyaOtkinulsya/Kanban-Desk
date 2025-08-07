<script setup lang="ts">
import { useSpacesStore } from '@/stores/spaces.store';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps<{
  spaceId: string;
  projectId: string;
}>();

const route = useRoute();
const projectId = ref(route.params.projectId as string);

const spaceStore = useSpacesStore();
const projects = computed(() => spaceStore.currentProjects);
const tasks = computed(() => projects.value.find((p) => p.id === projectId.value)?.tasks);
</script>

<template>
  <div v-for="(task, index) in tasks">
    <li :key="index">{{ task }}</li>
  </div>
</template>
