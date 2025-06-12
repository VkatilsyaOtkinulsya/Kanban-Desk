<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const message = ref('');
const type = ref<'error' | 'success'>('error');

const show = (msg: string, notificationType: 'error' | 'success') => {
  message.value = msg;
  type.value = notificationType;
  visible.value = true;
  const timeout = setTimeout(() => {
    hide();
    clearTimeout(timeout);
  }, 5000);
};

const hide = () => {
  visible.value = false;
};

defineExpose({
  show,
  hide,
});
</script>

<template>
  <div v-if="visible" class="notification" :class="type">
    <span>{{ message }}</span>
    <button @click="hide">x</button>
  </div>
</template>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification.error {
  background-color: #ffebee;
  color: #d32f2f;
  border-left: 4px solid #d32f2f;
}

.notification.success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #2e7d32;
}

.notification button {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: inherit;
}
</style>
