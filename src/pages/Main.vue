<script setup lang="ts">
import Counter from '@/components/Counter.vue'
import LeftsideBar from '@/modules/LeftsideBar/LeftsideBar.vue'
</script>

<template>
  <LeftsideBar />
  <section class="main">
    <Header>
      <div class="header-content-title">
        <h1>Kanban Desk</h1>
      </div>
    </Header>
    <Counter msg="Даунов" />
    <Footer>Footer</Footer>
  </section>
</template>

<style scoped></style>
