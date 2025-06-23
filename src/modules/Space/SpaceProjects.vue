<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
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
const title = ref('Активные проекты');

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
  <div class="projects-wrapper">
    <div class="projects-wrapper__title">
      <Input class="project__title" :modelValue="title" name="title" type="text">
        {{ title }}</Input
      >
    </div>
    <Loader v-if="isLoading" color="#fff" />
    <div v-else-if="projects" class="list-wrapper">
      <template v-for="(project, index) in projects" :key="'project-' + index">
        <div class="project-item__link">
          <router-link
            :to="{
              name: 'project-tasks',
              params: { spaceId: spaceId, projectName: project.replace(' ', '-') },
            }"
          >
            {{ project }}
          </router-link>
        </div>
        <div v-if="index < projects.length - 1" class="separator"></div>
      </template>
    </div>
    <div v-else>
      <p>Пространство пустое</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects-wrapper {
  display: block;
  margin: 0px 50px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  padding: 26px 0 0 10px;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;

  .projects-wrapper__title {
    display: flex;
    .project__title {
      display: block;
      width: 100%;
      font-size: 1.375rem;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      line-height: 2rem;
      color: #111012;

      margin-left: 15px;
      margin-right: 25px;
      border: none;
      box-sizing: border-box;

      padding: 0px;

      &:focus {
        padding-left: 10px;
        font-size: 16px;
        font-weight: normal;
        outline: 1px solid #000;
        border-radius: 3px;
      }
    }
  }

  .list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 10px;

    .project-item__link {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.1875rem;
      margin-left: 10px;
      padding: 10px 14px;

      a {
        color: #111012;
      }
    }

    .separator {
      height: 1px;
      background-color: #ccc;
      margin: 0 26px;
      box-sizing: border-box;
    }
  }
}
</style>
