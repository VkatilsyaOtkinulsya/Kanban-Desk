<script setup lang="ts">
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';

interface Props {
  href?: string;
  style?: string;
  label: string;
  tooltipText: string;
  isOpened: boolean;
}

withDefaults(defineProps<Props>(), {
  isOpened: false,
});
</script>

<template>
  <a :href="href" class="nav-item" aria-describedby="link-tooltip" tabindex="0">
    <div class="icon-wrapper">
      <slot name="icon"></slot>
    </div>
    <p v-show="isOpened">{{ label }}</p>
    <Tooltip
      id="link-tooltip"
      :text="tooltipText"
      role="tooltip"
      position="right"
      :custom-position="{ left: isOpened ? '50%' : '210%' }"
    >
    </Tooltip>
  </a>
</template>

<style scoped lang="scss">
.nav-item {
  position: relative;
  gap: 6px;
  text-decoration: none;
  color: rgb(242, 242, 242);
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background: #333333;
    border-radius: 6px;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    color: rgb(153, 153, 153);
  }
}

.leftside-bar--collapsed {
  .nav-item {
    &:hover .tooltip {
      opacity: 1;
    }
  }
}
</style>
