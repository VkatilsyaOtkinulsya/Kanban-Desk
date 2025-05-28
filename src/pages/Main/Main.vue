<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { useGreeting } from '@/composables/useGreetingDate.ts'
import LeftsideBar from '@/modules/LeftsideBar/LeftsideBar.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const userName = 'Иван Романов'
const { formatdate, getGreeting } = useGreeting(userName)

const currentDate = ref(new Date())

let intervalId: number | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    currentDate.value = new Date()
  }, 600000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <LeftsideBar />
  <section id="main">
    <Header title="Kanban Desk" :style="'background-color: #1e1e1e'" />
    <div class="main__container">
      <div class="main__content-welcome">
        <p class="date">{{ formatdate(currentDate) }}</p>
        <h1>{{ getGreeting(currentDate) }}</h1>
      </div>
      <div class="main__content"></div>
    </div>
    <Footer title="Footer"><template #content>Footer</template></Footer>
  </section>
</template>

<style scoped lang="scss">
$breakpoint-desktop: 1280px;
$breakpoint-laptop: 1024px;
$breakpoint-tablet: 768px;
$breakpoint-mobile: 576px;

#main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  overflow-x: auto;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;

  .main__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    box-sizing: border-box;

    height: 100%;
    @media (min-width: $breakpoint-desktop) {
      padding: 0 124px;
    }
  }
}
</style>
