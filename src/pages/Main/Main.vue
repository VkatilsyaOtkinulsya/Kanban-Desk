<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import LeftsideBar from '@/modules/LeftsideBar/LeftsideBar.vue';

import { useGreeting, useCurrentTime } from '@/composables/useGreetingDate.ts';
import { ref, onMounted } from 'vue';
import type { SpacesData } from '@/types/content';
import { SpacesService } from '@/services/spaces.service';
import { AxiosError } from 'axios';

const spaces = ref<SpacesData>({});
const showLoader = ref(false);
const userName = 'Иван Романов';

const currentTime = useCurrentTime();
const { formatdate, getGreeting } = useGreeting(userName);

onMounted(async () => {
  showLoader.value = true;
  try {
    spaces.value = await SpacesService.getSpacesData();
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('Error:', err.response);
    }
    throw err;
  } finally {
    showLoader.value = false;
  }
});
</script>

<template>
  <LeftsideBar :spaces="spaces" :showLoader />
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
