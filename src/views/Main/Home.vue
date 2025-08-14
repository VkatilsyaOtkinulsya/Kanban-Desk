<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

import { useGreeting, useCurrentTime } from '@/hooks/useGreetingDate';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
console.log(authStore.userInfo);
const userName = `${authStore.userInfo.firstName} ${authStore.userInfo.lastName}`;

const currentTime = useCurrentTime();
const { formatdate, getGreeting } = useGreeting(userName);
</script>

<template>
  <section id="main">
    <Header title="Главная" :style="'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);'" />

    <div class="main__container">
      <div class="main__content-welcome">
        <p class="date">{{ formatdate(currentTime) }}</p>
        <h1>{{ getGreeting(currentTime) }}</h1>
      </div>
      <div class="main__content">
        <div class="grid grid-cols-3 gap-4">
          <div class="p-4 bg-blue-500">Элемент 1</div>
          <div class="p-4 bg-red-500">Элемент 2</div>
          <div class="p-4 bg-green-500">Элемент 3</div>
        </div>
      </div>
    </div>
    <Footer title="Footer"><template #content>Footer</template></Footer>
  </section>
</template>

<style scoped lang="scss">
@use './Main.module';
</style>
