<script setup lang="ts">
import LeftsideBar from '@/modules/LeftsideBar/LeftsideBar.vue';
import { ref, onMounted } from 'vue';
import { handleApiError } from '@/utils/error-handler';
import { useAuthStore } from '@/stores/auth.store';
import { useSpacesStore } from '@/stores/spaces.store';

const showLoader = ref(false);

const authStore = useAuthStore();
const userName = `${authStore.userInfo.firstName} ${authStore.userInfo.lastName}`;
const spaceStore = useSpacesStore();

onMounted(async () => {
  try {
    await spaceStore.loadSpace();
  } catch (err) {
    handleApiError(err);
  }
});
</script>

<template>
  <LeftsideBar :spaces="spaceStore.spaces" :showLoader :userName> </LeftsideBar>
  <div class="content-wrapper">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.content-wrapper {
  width: 100%;
}
</style>
