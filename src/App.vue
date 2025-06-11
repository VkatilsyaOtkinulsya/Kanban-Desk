<script setup lang="ts">
import { onMounted, ref } from 'vue';
import NotificationModal from '@/components/ui/modal/NotificationModal.vue';
import { registerNotificationComponent } from '@/utils/error-handler';
import { useCheckAuth } from './composables/useCheckAuth';
import type { NotificationComponent } from './types/notification';

const notificationRef = ref<NotificationComponent | null>(null);

onMounted(() => {
  if (notificationRef.value) {
    registerNotificationComponent(notificationRef.value);
  }
});

const { checkUser } = useCheckAuth();
checkUser();
</script>

<template>
  <div id="app-wrapper">
    <router-view />
    <NotificationModal ref="notificationRef" />
  </div>
</template>

<style scoped>
#app-wrapper {
  display: inline-flex;
  height: 100vh;
  width: 100%;
}
</style>
