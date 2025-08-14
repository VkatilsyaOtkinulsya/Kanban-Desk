<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { SpaceIcon } from '@/components/icons/index';
import { useSpacesStore } from '@/stores/spaces.store';

defineProps<{
  spaceId: string;
}>();

const route = useRoute();
const spaceId = ref(route.params.spaceId as string);

const { spaces: data, space } = useSpacesQuery(spaceId.value);

watch(
  () => route.params.spaceId,
  (newSpaceId) => {
    spaceId.value = newSpaceId as string;
  }
);
</script>

<template>
  <div class="space-wrapper">
    <div class="header__nav-list">
      <div class="nav-item">
        <SpaceIcon :color="'#000'" :size="18" />
        <router-link :to="{ name: 'space-projects', params: { spaceId } }">
          {{ space.name }}
        </router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.space-wrapper {
  width: 100%;
  height: 100vh;
  background-color: rgb(241, 255, 239);
  box-sizing: border-box;
}
.header__nav-list {
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  padding: 30px;
  gap: 14px;
  box-sizing: border-box;

  margin-bottom: 30px;

  .nav-item {
    display: flex;
    align-items: center;
    gap: 4px;
    svg {
      color: #000;
    }

    a {
      color: #000;
      font-size: 1rem;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
      line-height: 21px;
    }
  }
}
</style>
