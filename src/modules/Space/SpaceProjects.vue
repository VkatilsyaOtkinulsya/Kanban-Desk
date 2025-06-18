<script setup lang="ts">
import Loader from '@/components/ui/loader/Loader.vue';
import { SpacesService } from '@/services/spaces.service';
import type { Project, ProjectsData } from '@/types/contentTypes';
import { handleApiError } from '@/utils/error-handler';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const spaceId = route.params.spaceId as string;
const projects = ref<Project[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await SpacesService.getProjects(spaceId);
    projects.value = response.projects;
  } catch (err) {
    handleApiError(err, {
      context: 'Не удалось загрузить данные пространств',
    });
  } finally {
  }
});
</script>

<template>
  <div>
    <h2>Активные проекты</h2>
    <Loader v-if="isLoading" color="#fff" />
    <div v-else class="list-wrapper">
      <router-link
        v-for="(project, index) in projects"
        :key="index"
        :to="{
          name: 'ProjectTasks',
          params: { spaceId: route.params.spaceId, projectId: project.id },
        }"
      >
        {{ project.name }}
      </router-link>
    </div>
  </div>
</template>
