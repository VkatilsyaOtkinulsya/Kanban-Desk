<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import LeftsideBar from '@/modules/LeftsideBar/LeftsideBar.vue';

import { useGreeting, useCurrentTime } from '@/composables/useGreetingDate.ts';
import { ref, onMounted } from 'vue';
import type { SpacesData } from '@/types/contentTypes';
import { SpacesService } from '@/services/spaces.service';
import { handleApiError } from '@/utils/error-handler';
import { useAuthStore } from '@/stores/auth.store';

const spaces = ref<SpacesData>({});
const showLoader = ref(false);

const authStore = useAuthStore();
const userName = `${authStore.userInfo.firstName} ${authStore.userInfo.lastName}`;

const currentTime = useCurrentTime();
const { formatdate, getGreeting } = useGreeting(userName);

onMounted(async () => {
  showLoader.value = true;
  try {
    spaces.value = await SpacesService.getSpacesData();
    console.log(spaces.value);
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
  <LeftsideBar :spaces :showLoader :userName />
  <section id="main">
    <Header title="Kanban Desk" :style="'background-color: #1e1e1e'" />
    <div class="main__container">
      <div class="main__content-welcome">
        <p class="date">{{ formatdate(currentTime) }}</p>
        <h1>{{ getGreeting(currentTime) }}</h1>
      </div>
      <div class="main__content"></div>
    </div>
    <Footer title="Footer"><template #content>Footer</template></Footer>
  </section>
</template>

<style scoped lang="scss">
@use './Main.module';
</style>
