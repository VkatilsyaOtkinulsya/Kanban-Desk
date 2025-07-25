<script setup lang="ts">
import ProjectItemIcon from '@/components/icons/ProjectItemIcon.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import Modal from '@/components/ui/modal/Modal.vue';
import EditableTitle from '@/components/ui/title/EditableTitle.vue';
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
const showModal = ref(false);

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
      <EditableTitle />
    </div>
    <Loader v-if="isLoading" color="#fff" />
    <div v-else-if="projects" class="projects-list">
      <template v-for="(project, index) in projects" :key="'project-' + index">
        <div class="project-item__link">
          <div class="icon-wrapper">
            <ProjectItemIcon />
          </div>
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
    <div class="projects-list_add-project">
      <button
        id="add-project-button show-modal"
        @click="showModal = true"
        class="add-project__button"
      >
        <svg
          data-v-b51b669c=""
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-none"
        >
          <path
            data-v-b51b669c=""
            d="M8.83431 13.3337V8.00033M8.83431 8.00033V2.66699M8.83431 8.00033H14.1676M8.83431 8.00033H3.50098"
            stroke="#111012"
            stroke-opacity="0.75"
            stroke-width="1.6"
            stroke-linecap="round"
          ></path>
        </svg>
        <p class="btn-text">Добавить проект</p>
      </button>
      <Teleport to="body">
        <Modal type="create" :show="showModal" @close="showModal = false" />
      </Teleport>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects-wrapper {
  display: block;
  margin: 0px 50px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  padding: 26px 0 10px 10px;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;

  .projects-wrapper__title {
    display: flex;
    font-family: 'Roboto', sans-serif;
    font-size: 1.375rem;
    margin-left: 15px;
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    padding: 8px 10px 10px;

    .project-item__link {
      display: flex;
      align-items: center;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 2rem;
      margin-left: 10px;
      padding: 10px 14px;
      cursor: pointer;

      &:hover {
        box-shadow: 0px 5px 16px 2px rgba(53, 77, 96, 0.15);
        border-radius: 6px;
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
      }

      a {
        display: block;
        justify-self: self-start;
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

  .projects-list_add-project {
    display: flex;
    justify-content: center;
    height: 40px;
    padding: 0 20px 0 20px;
    cursor: pointer;

    .add-project__button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      height: auto;
      background-color: rgba(17, 16, 18, 0.05);
      padding: 10px;
      border-radius: 6px;
      border: none;
      transition: ease-in;
      transition-duration: 0.2s;

      &:hover {
        background-color: rgba(17, 16, 18, 0.1);
      }

      .btn-text {
        font-size: 14px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        color: #111012bf;
      }
    }
  }
}
</style>
