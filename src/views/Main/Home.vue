<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

import { useGreeting, useCurrentTime } from '@/composables/useGreetingDate.ts';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const userName = `${authStore.userInfo.firstName} ${authStore.userInfo.lastName}`;

const currentTime = useCurrentTime();
const { formatdate, getGreeting } = useGreeting(userName);
</script>

<template>
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
