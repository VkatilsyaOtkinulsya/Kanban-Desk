<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div>
    <Header title="Header" />
    <router-view />
    <Footer title="Footer" />
  </div>
</template>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}
</style>
