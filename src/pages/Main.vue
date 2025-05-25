<script setup lang="ts">
import Counter from '@/components/Counter.vue'
import Header from '@/components/Header.vue'
import LeftsideBar from '@/modules/LeftsideBar/LeftsideBar.vue'
</script>

<template>
  <LeftsideBar />
  <section class="main">
    <Header title="Kanban Desk" :style="'background-color: #1e1e1e'" />
    <Counter msg="Даунов" />
    <Footer>Footer</Footer>
  </section>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
</style>
