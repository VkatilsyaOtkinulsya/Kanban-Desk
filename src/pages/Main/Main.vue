<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import LeftsideBar from '@/modules/LeftsideBar/LeftsideBar.vue';

import { useGreeting, useCurrentTime } from '@/composables/useGreetingDate.ts';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.ts';
import axios, { AxiosError } from 'axios';
import type { SpacesData } from '@/types/content';

const authStore = useAuthStore();

const spaces = ref<SpacesData>({});
const showLoader = ref(false);
const userName = 'Иван Романов';

const currentTime = useCurrentTime();
const { formatdate, getGreeting } = useGreeting(userName);

const getAllSpaces = async () => {
  showLoader.value = true;
  try {
    const response = await axios.get(
      `https://jwt-tokens-firebase-add21-default-rtdb.europe-west1.firebasedatabase.app/spaces.json?auth=${authStore.userInfo.token}`
    );
    spaces.value = response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error('Error:', err.response);
    }
  } finally {
    showLoader.value = false;
  }
};

onMounted(async () => {
  await getAllSpaces();
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

<!-- https://console.firebase.google.com/project/jwt-tokens-firebase-add21/database/jwt-tokens-firebase-add21-default-rtdb/data/~2F -->

<style scoped lang="scss">
@use './Main.module';
</style>
