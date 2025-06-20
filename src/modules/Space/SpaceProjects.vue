<script setup lang="ts">
import Loader from '@/components/ui/loader/Loader.vue';
import { SpacesService } from '@/services/spaces.service';
import { handleApiError } from '@/utils/error-handler';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

defineProps<{
  spaceId: string;
}>();

const route = useRoute();
const projects = ref<string[]>([]);
const isLoading = ref(false);
const spaceId = ref(route.params.spaceId as string);

const loadSpaceData = async () => {
  isLoading.value = true;
  try {
    const response = SpacesService.getProjects(route.params.spaceId as string);
    projects.value = Object.keys(response);
    return projects.value;
  } catch (err) {
    handleApiError(err, {
      context: 'Не удалось загрузить данные пространств',
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadSpaceData();
});

watch(
  () => route.params.spaceId,
  (newSpaceId) => {
    spaceId.value = newSpaceId as string;
    loadSpaceData();
  }
);
</script>

<template>
  <div>
    <h2>Активные проекты</h2>
    <Loader v-if="isLoading" color="#fff" />
    <div v-else-if="projects" class="list-wrapper">
      <div
        v-for="(project, index) in projects"
        :key="index"
        :to="{
          name: 'ProjectTasks',
          params: { spaceId: index, projectId: Object.values(project) },
        }"
      >
        {{ project }}
      </div>
    </div>
    <div v-else>
      <p>Пространство пустое</p>
    </div>
  </div>
</template>
