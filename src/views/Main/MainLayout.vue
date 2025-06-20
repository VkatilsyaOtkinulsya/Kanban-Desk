<script setup lang="ts">
import LeftsideBar from '@/modules/LeftsideBar/LeftsideBar.vue';
import { ref, onMounted } from 'vue';
import type { Space } from '@/types/contentTypes';
import { SpacesService } from '@/services/spaces.service';
import { handleApiError } from '@/utils/error-handler';
import { useAuthStore } from '@/stores/auth.store';

const spacesData = ref<Space[]>([]);
const showLoader = ref(false);

const authStore = useAuthStore();
const userName = `${authStore.userInfo.firstName} ${authStore.userInfo.lastName}`;

onMounted(async () => {
  showLoader.value = true;
  try {
    const response = await SpacesService.getSpacesData();
    spacesData.value = response;
  } catch (err) {
    handleApiError(err, {
      context: 'Не удалось загрузить данные пространств',
    });
  } finally {
    showLoader.value = false;
  }
});
</script>

<template>
  <LeftsideBar :spaces="spacesData" :showLoader :userName> </LeftsideBar>
  <div class="content-wrapper">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
@use './Main.module';
</style>
