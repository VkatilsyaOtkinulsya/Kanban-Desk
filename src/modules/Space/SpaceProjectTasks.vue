<script setup lang="ts">
import { useSpacesStore } from '@/stores/spaces.store';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  spaceId: string;
  projectId: string;
  project: {
    tasks: string[];
  };
}>();

const route = useRoute();
const projectId = ref(route.params.projectId as string);
console.log(props.project);
const spaceStore = useSpacesStore();
const projects = computed(() => spaceStore.currentProjects);
const tasks = computed(() => projects.value.find((p) => p.id === projectId.value)?.tasks);
</script>

<template>
  <div class="tasks-wrapper">
    <div v-for="(task, index) in tasks">
      <li :key="index">{{ task }}</li>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tasks-wrapper {
  display: block;
  width: 50%;
  margin: 0px 50px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  padding: 26px 0 10px 10px;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
